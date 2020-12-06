import './App.css';
import Main from './components/main';
import Header from './components/header';
import Footer from './components/footer';
import Compare from './components/compare';
import {Link,Route,Switch} from 'react-router-dom';

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
