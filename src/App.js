import React, { Fragment, Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import bent from 'bent';
import './App.css';
import Users from './users/Users';
import Search from './users/Search';
import { Alert } from './layout/Alert';
import { Navbar } from './layout/Navbar';
import { About } from './pages/About';
import { User } from './users/User';

class App extends Component {
  state ={
    users: [],
    user: {},
    repos: [],
    loading: false,
    value: "",
    alert: null,
    
    
  }
  

  searchGithubUsers=(search)=>{
    console.log("Searching for github user containing the phrase "+search);
    this.setState({loading: true});
    const getJSON = bent('json');
    let githubUsers = getJSON(`https://api.github.com/search/users?q=${search}
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    githubUsers.then({headers:{"Accept":"application/vnd.github.v3+json"}});
    githubUsers.then((data)=>{
      this.setState({users: data.items, loading: false, alert:null});
    });
  };

  getGithubUser =(userToSearch)=>{
    console.log(userToSearch);
    this.setState({loading: true});
    const getJSON = bent('json');
    let githubUsers = getJSON(`https://api.github.com/users/${userToSearch}?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    githubUsers.then({headers:{"Accept":"application/vnd.github.v3+json"}});
    githubUsers.then((data)=>{
      this.setState({user: data, loading: false, alert:null});
    });
  };

  getGithubUserRepos =(gituhubUser)=>{
    console.log(gituhubUser);
    this.setState({loading: true});
    const getJSON = bent('json');
    let githubUsers = getJSON(`https://api.github.com/users/${gituhubUser}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    githubUsers.then({headers:{"Accept":"application/vnd.github.v3+json"}});
    githubUsers.then((data)=>{
      this.setState({repos: data, loading: false, alert:null});
    });
  };

  clearGithubUsers = ()=>this.setState({users: [], loading: false});

  setAlert = (msg,type)=>{
    this.setState({alert: {msg, type}});
    setTimeout(()=>this.setState({alert: null}),5000);
  };
  static cv=""
  captureValue = (e)=>this.setState({ [e.target.name]: e.target.value });
  
  clickHandler(e) {
    e.preventDefault();
    console.log("Final: "+this.state.value);
    Username.changeValue(this.state.value).bind(this);
  }
  render(){
    const {users, user, repos, loading} = this.state;
    if(users){
    let showClearButton = users.length>0?true:false;
    return (
      <Router>
      <div className="App">
          <Navbar />
        <header className="container">
        <Alert alert = {this.state.alert}/>
        <Switch>
          <Route
            exact path="/"
            render={props=>(
              <Fragment>
              <div>
                <button onClick={this.clickHandler.bind(this)} >Change Username</button>
                <input type="text" name="value" value={this.state.value} onChange={this.captureValue}/>
                <Username value = {this.state.value} />
                <Search 
                  searchGithubUsers={ this.searchGithubUsers }
                  setAlert={this.setAlert}
                  showClear={showClearButton}
                  clearGithubUsers={this.clearGithubUsers}
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
              getGithubUser={this.getGithubUser}
              getGithubUserRepos={this.getGithubUserRepos} 
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
  
}

export default App;
