import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import { Alert } from './layout/Alert';
import { Navbar } from './layout/Navbar';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { User } from './users/User';
import { Home } from './pages/Home';
import './App.css';
const App = ()=> {
  return (
    <GithubState>
      <AlertState>
        <Router>
        <div className="App">
            <Navbar />
          <header className="container">
          <Alert />
          <Switch>
          <Route
              exact path="/"
              component={Home}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' component={User}/>
            <Route component={NotFound} />
          </Switch>       
          </header>
        </div>
        </Router>
        </AlertState>
    </GithubState>
  );
  } 

export default App;
