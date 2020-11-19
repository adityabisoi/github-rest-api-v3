import './App.css';
import axios from 'axios'
import {useState} from 'react'

const App = () => {

  const [username,setUsername] = useState('')

  const updateUsername=(e)=>{
    setUsername(e.target.value)
  }

  const getDetails=()=>{
    axios.get('https://api.github.com/users/adityabisoi/repos')
      .then(data=>console.log(data))
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
