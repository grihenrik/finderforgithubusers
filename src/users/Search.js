import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({clearGithubUsers, searchGithubUsers, setAlert, showClear})=> {
    const [ search, setSearch ] = useState('');

    const handleSearch = (e)=>setSearch(e.target.value);

    const submitSearch = (e)=>{
        e.preventDefault();
        if(search===''){
            setAlert('Please enter search parameter', 'light');

        } else{

            searchGithubUsers(search);
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
            {showClear && <button className="btn btn-light btn-block" 
                onClick={clearGithubUsers}>Clear</button>}
        </div>
    )
}

Search.propTypes = {
    searchGithubUsers: PropTypes.func.isRequired,
    clearGithubUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired

};
export default Search;
