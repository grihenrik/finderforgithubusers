import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library }from '@fortawesome/fontawesome-svg-core';
import {fab, faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(fab, faGithub)

export const Navbar = ({icon, title}) => {
    return (
        <div className='navbar bg-primary'> 
            <h1>
                <FontAwesomeIcon icon={icon}/> {title}
            </h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </div>
    )
    
}

Navbar.defaultProps = {
    title: 'Github Finder',
    icon: faGithub
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired
}