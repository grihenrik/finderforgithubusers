import React from 'react';
import {Link} from 'react-router-dom';

const UserItem = ({user:{login, avatar_url, html_url}})=> {

    return (
        <div>
            <img src={avatar_url} alt=''/>
            <h3>{login}</h3>
            <div>
                <Link to={`/user/${login}`}>More</Link>
            </div>
        </div>
    )

}

export default UserItem
