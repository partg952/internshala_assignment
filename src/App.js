import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import Login from './components/Login'
import Home from './components/Home';
import {BrowserRouter as Router,Route} from 'react-router-dom';
function App() {
  
  return (
    <div className="App">
      <Router>
        <Route path='/' exact>
      <Login/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
