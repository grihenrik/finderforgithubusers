import React, { useState, useContext } from 'react';
import GithubContext from '../context/github/githubContext';
import AlertContext from '../context/alert/alertContext';

const Search = ()=> {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [ search, setSearch ] = useState('');
    
    const handleSearch = (e)=>setSearch(e.target.value);

    const submitSearch = (e)=>{
        e.preventDefault();
        if(search===''){
            alertContext.setAlert('Please enter search parameter', 'light');
        } else{
           githubContext.searchGithubUsers(search);
            setSearch('');
        }
        
    }

    return (
        <div>
            <form onSubmit={submitSearch} className="form">
                <input 
                    type="text" 
                    name="search" 
                    placeholder="Search users..."
                    value = {search}
                    onChange={handleSearch}
                    />
                <input type="submit" value="Search" className="btn btn-dartk btn-block"/>
            </form>
            {githubContext.users.length>0 && <button className="btn btn-light btn-block" 
                onClick={githubContext.clearGithubUsers}>Clear</button>}
        </div>
    )
}

export default Search;
