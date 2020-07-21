import React, { Component } from 'react';
import PropTypes from 'prop-types';
export class Search extends Component {
    state = {
        search: ''
    };

    static propTypes = {
        searchGithubUsers: PropTypes.func.isRequired,
        clearGithubUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired
    
    };
    handleSearch = (e)=>this.setState({ [e.target.name] : e.target.value});

    submitSearch = (e)=>{
        e.preventDefault();
        if(this.state.search===''){
            this.props.setAlert('Please enter search parameter', 'light');

        } else{
            //console.log(this.state.search);
            this.props.searchGithubUsers(this.state.search);
            this.setState({search : ""});
        }
        
    }
    
    render() {
        const {clearGithubUsers}=this.props;
        return (
            <div>
                <form onSubmit={this.submitSearch} className="form">
                    <input 
                        type="text" 
                        name="search" 
                        placeholder="Search users..."
                        value = {this.state.search}
                        onChange={this.handleSearch}
                        />
                    <input type="submit" value="Search" className="btn btn-dartk btn-block"/>
                </form>
                {this.props.showClear && <button className="btn btn-light btn-block" 
                  onClick={clearGithubUsers}>Clear</button>}
            </div>
        )
    }
}

export default Search;
