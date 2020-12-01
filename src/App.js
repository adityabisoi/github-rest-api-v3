import './App.css';
import axios from 'axios'
import {useState} from 'react'

const App = () => {

  const [username,setUsername] = useState('')

  const updateUsername=(e)=>{
    setUsername(e.target.value)
  }

  const getDetails=()=>{
    // URLs to be used for different API endpoints
    const reposUrl = `https://api.github.com/users/${username}/repos`,
          gistsUrl = `https://api.github.com/users/${username}/gists`,
          followersUrl = `https://api.github.com/users/${username}/followers`,
          followingUrl = `https://api.github.com/users/${username}/following`,
          starredUrl = `https://api.github.com/users/${username}/starred`;

    /**
     * The API returns atmost 30 entries by default unless the
     * 'per_page' GET parameter is specified, which can be a
     * 100 at maximum. Multiple calls for each page are required
     * to fetch all entries. */
    const requests = [
      axios.get(reposUrl, { params: { per_page: 100 } }),
      axios.get(gistsUrl, { params: { per_page: 100 } }),
      axios.get(followersUrl, { params: { per_page: 100 } }),
      axios.get(followingUrl, { params: { per_page: 100 } }),
      axios.get(starredUrl, { params: { per_page: 100 } })
    ];

    axios.all(requests)
      .then(axios.spread((...responses) => {
        const repos = responses[0],
              gists = responses[1],
              followers = responses[2],
              following = responses[3],
              starred = responses[4];

        return {
          username,
          repos: repos.statusText === 'OK' ? repos.data : null,
          gists: gists.statusText === 'OK' ? gists.data : null,
          followers: followers.statusText === 'OK' ? followers.data : null,
          following: following.statusText === 'OK' ? following.data : null,
          starred: starred.statusText === 'OK' ? starred.data : null,
        };
      }), err => console.log(err))
      .then(data => {
        // Add an entry for forks
        const results = {
          ...data,
          forks: data.repos.filter(repo => repo.fork)
        };

        console.log(results);
      }, err => console.log(err))
      .catch(err => console.log(err));
  }

  const sendUsername=(e)=>{
    e.preventDefault()
    getDetails(username)
  }

  return(
    <div className="App">
      <form onSubmit={sendUsername}>
        <label>Enter your github username</label>
        <input type='text' value={username} onChange={updateUsername}/>
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default App;
