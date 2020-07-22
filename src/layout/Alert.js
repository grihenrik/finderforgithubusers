import React, {useContext}from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library }from '@fortawesome/fontawesome-svg-core';
import {fas, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import AlertContext from '../context/alert/alertContext';
library.add(fas, faInfoCircle)

export const Alert = () => {
    const alertContext =useContext(AlertContext);
    const { alert } = alertContext;
    
    return (
        alert !== null && (<div className={`alert alert-${alert.type}`}>
            <FontAwesomeIcon icon={faInfoCircle}/> {alert.msg}
        </div>)
    )
    
    
}
