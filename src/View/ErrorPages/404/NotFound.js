import React from 'react';
import {Link} from 'react-router-dom';

import './NotFound.css';

export default (props) => {
    return (
        <div className='nf-container'>
            <div className="nf-cal-header">
                <div className="nf-header-el"></div>
                <div className="nf-header-el"></div>
                <div className="nf-header-el"></div>
                <div className="nf-header-search"></div>
            </div>
            <div className="nf-cal-body">
                <div className="nf-cal-main-container">
                    <h1>404</h1>
                    <h3>I think you lost me...</h3>
                    <h4>maybe try going back or going home and start over</h4>
                    
                </div>
                <div className="nf-cal-lower-container">
                    <button onClick={props.history.goBack} id='nf-lower-back'>Send Me Back</button>
                    <Link to='/'>
                    <button>Take Me Home</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
