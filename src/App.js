import './App.css';
import api from './services/GitHub';
import {useState} from 'react'

const App = () => {

  const [username, setUsername] = useState('');

  const updateUsername=(e)=>{
    setUsername(e.target.value);
  }

  const getDetails=()=>{
    api.getDetails(username)
      .catch(err => console.log(err));
  }

  const sendUsername=(e)=>{
    e.preventDefault();
    getDetails(username);
  }

  return(
    <div className="App">
      <form onSubmit={sendUsername}>
        <label>Enter your github username</label>
        <input type='text' value={username} onChange={updateUsername}/>
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}

export default App;
