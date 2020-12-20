import './App.css';
import Main from './components/main/Main';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Compare from './components/Compare';
import {Route} from 'react-router-dom';

const App = () => {
  return(
    <div className="App">
      <Header/>
      <Route exact path="/github-rest-api-v3/"><Main /></Route>
      <Route path="/github-rest-api-v3/compare"><Compare/></Route>
      <Footer/>
    </div>
  );
};

export default App;
