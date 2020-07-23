import React, {useReducer} from 'react';
import bent from 'bent';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS,
    SET_LOADING, 
    GET_USER, 
    GET_REPOS, CLEAR_USERS}from '../types'

let githubClientId;
let githubClientSecret;
if(process.env.NODE_ENV!=='production'){
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
    const [state, dispatch]= useReducer(GithubReducer, initialState);

    // Actions

    // Search Users
    const searchGithubUsers=(search)=>{
        console.log("Searching for github user containing the phrase "+search);
        setLoading();
        const getJSON = bent('json');
        let githubUsers = getJSON(`https://api.github.com/search/users?q=${search}
          &client_id=${githubClientId}
          &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        githubUsers.then({headers:{"Accept":"application/vnd.github.v3+json"}});
        githubUsers.then((data)=>{
            dispatch({
                type: SEARCH_USERS,
                payload: data.items
            })
        //   setUsers(data.items);
        //   setAlert(null);
        });
      };
    
    // Get User
    const getGithubUser =(userToSearch)=>{
        console.log(userToSearch);
        setLoading();
        const getJSON = bent('json');
        let githubUsers = getJSON(`https://api.github.com/users/${userToSearch}?
          client_id=${githubClientId}
          &client_secret=${githubClientSecret}`);
        githubUsers.then({headers:{"Accept":"application/vnd.github.v3+json"}});
        githubUsers.then((data)=>{
          dispatch({
              type: GET_USER,
              payload: data
          })
        //   setLoading();
        //   setAlert(null);
        });
      };

    // Get Repos
    const getGithubUserRepos =(gituhubUser)=>{

        setLoading();
        const getJSON = bent('json');
        let githubUsers = getJSON(`https://api.github.com/users/${gituhubUser}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
        githubUsers.then({headers:{"Accept":"application/vnd.github.v3+json"}});
        githubUsers.then((data)=>{
            dispatch({
                type: GET_REPOS,
                payload: data
            })
        //   setRepos(data);
          // setLoading(false);
          // setAlert(null);
        });
      };
    // Clear Users
    const clearGithubUsers = ()=>dispatch({type: CLEAR_USERS});
    // Set Loading
    const setLoading = ()=> dispatch({type: SET_LOADING});

    return <GithubContext.Provider
     value={{
         users: state.users,
         user: state.user,
         repos: state.repos,
         loading: state.loading,
         searchGithubUsers,
         clearGithubUsers,
         getGithubUser,
         getGithubUserRepos

     }}>
        {props.children}
     </GithubContext.Provider>
}
export default GithubState;