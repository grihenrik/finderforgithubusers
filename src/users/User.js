import React, { Fragment, useEffect, useContext } from 'react';
import {Link }from 'react-router-dom';
import Spinner from '../layout/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library }from '@fortawesome/fontawesome-svg-core';
import {fas, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Repos from '../repos/Repos';
import GithubContext from '../context/github/githubContext';
library.add(fas, faCheck, faTimesCircle)

export const User = ({match})=> {
    const githubContext = useContext(GithubContext);
    const {user, repos, loading, getGithubUser, getGithubUserRepos} = githubContext;
    useEffect(()=>{
        getGithubUser(match.params.login);
        getGithubUserRepos(match.params.login);
        // eslint-disable-next-line
    },[]);

    const { 
        name,
        company,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;
    
    if(loading){
        return <Spinner />;
    } else {
        return (
            <Fragment>
                <Link to='/' className="btn btn-light">Back to search</Link>
                <p>Hireable: {' '}
                {hireable ? <FontAwesomeIcon icon={faCheck} className="text-success"/>: <FontAwesomeIcon icon={faTimesCircle} className="text-danger"/>}
                </p>
                <div className='card grid-2'>
                    <div className=' all-center'>
                        <img src={avatar_url} alt={login} className='round-img' style={{width: '150px'}}/>
                        <h1>{name}</h1>
                        <p>{location}</p>
                    </div>
                    <div>
                        {bio && <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                            </Fragment>}
                        <a href={html_url} className='btn btn-dark my-1'>
                            Visit Github Profile
                        </a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>Username: {login}</strong></Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company: {company}</strong></Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Website: {blog}</strong></Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className='badge badge-primary'>Followers: {followers}</div>
                    <div className='badge badge-success'>Following: {following}</div>
                    <div className='badge badge-light'>Public repos: {public_repos}</div>
                    <div className='badge badge-dark'>Public gists : {public_gists}</div>
                </div>
                <Repos repos={repos}/>
            </Fragment>
        )
    }
    

}

export default User
