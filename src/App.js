import React, { Fragment, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import bent from 'bent';
import './App.css';
import Users from './users/Users';
import Search from './users/Search';
import { Alert } from './layout/Alert';
import { Navbar } from './layout/Navbar';
import { About } from './pages/About';
import { User } from './users/User';

const App = ()=> {
  const [users, setUsers]= useState([]);
  const [user, setUser]=useState({});
  const [repos, setRepos]= useState([]);
  const [loading, setLoading]= useState(false);
  const [alert, setAlert]= useState(null);

  const searchGithubUsers=(search)=>{
    console.log("Searching for github user containing the phrase "+search);
    setLoading(true);
    const getJSON = bent('json');
    let githubUsers = getJSON(`https://api.github.com/search/users?q=${search}
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    githubUsers.then({headers:{"Accept":"application/vnd.github.v3+json"}});
    githubUsers.then((data)=>{
      setUsers(data.items);
      setLoading(false);
      setAlert(null);
    });
  };

  const getGithubUser =(userToSearch)=>{
    console.log(userToSearch);
    setLoading(true);
    const getJSON = bent('json');
    let githubUsers = getJSON(`https://api.github.com/users/${userToSearch}?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    githubUsers.then({headers:{"Accept":"application/vnd.github.v3+json"}});
    githubUsers.then((data)=>{
      setUser(data);
      setLoading(false);
      setAlert(null);
    });
  };

  const getGithubUserRepos =(gituhubUser)=>{
    console.log(gituhubUser);
    setLoading( true );
    const getJSON = bent('json');
    let githubUsers = getJSON(`https://api.github.com/users/${gituhubUser}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    githubUsers.then({headers:{"Accept":"application/vnd.github.v3+json"}});
    githubUsers.then((data)=>{
      setRepos(data);
      setLoading(false);
      setAlert(null);
    });
  };

  const clearGithubUsers = ()=>{
    setUsers([]);
    setLoading(false);
  }

  const showAlert = (msg,type)=>{
    setAlert({msg, type});
    setTimeout(()=>setAlert(null),5000);
  };

  
  
  

  if(users){
  let showClearButton = users.length>0?true:false;
  return (
    <Router>
    <div className="App">
        <Navbar />
      <header className="container">
      <Alert alert = {alert}/>
      <Switch>
        <Route
          exact path="/"
          render={props=>(
            <Fragment>
            <div>
              
              <Search 
                searchGithubUsers={ searchGithubUsers }
                setAlert={showAlert}
                showClear={showClearButton}
                clearGithubUsers={clearGithubUsers}
              />
              {console.log(showClearButton)}
              <Users loading={loading} users={users}/>
              </div>
          </Fragment>
        )}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/user/:login' render={props=>(
          <User 
            {...props } 
            getGithubUser={getGithubUser}
            getGithubUserRepos={getGithubUserRepos} 
            user={user}
            repos={repos} 
            loading={loading}/>
          )}/>

      </Switch>
      
      </header>
    </div>
    </Router>
  );
  } else {
    return "Searching..."
  }
}

export default App;
