import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library }from '@fortawesome/fontawesome-svg-core';
import {fas, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
library.add(fas, faInfoCircle)
export const Alert = ({alert}) => {
    if(alert !== null){
        return (
            <div className={`alert alert-${alert.type}`}>
                <FontAwesomeIcon icon={faInfoCircle}/> {alert.msg}
            </div>
        )
    } else
    return ''
    
}
