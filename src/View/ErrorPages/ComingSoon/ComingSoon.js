import React from 'react';
import { Link } from 'react-router-dom';
import './ComingSoon.css';


export default () => {
    return (
        <div className='coming-soon-container'>
            <div className="coming-soon-text-box">
                <h2 id='coming-soon-h2'>Coming Soon</h2>
                <h3>This page is still under development</h3>
                <Link to='/'>
                    <button>Take Me Home</button>
                </Link>
            </div>
        </div>
    )
}
