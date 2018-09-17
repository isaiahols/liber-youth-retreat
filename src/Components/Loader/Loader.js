import React from 'react';
import Spinner from 'react-spinkit';

import './Loader.css';

export default () => {
    return (
        <div className='loader-container' >
            {/* <Spinner 
            className="loader" name="sk-folding-cube" 
            color="black" /> */}
            <Spinner 
            className='loader'
            name="folding-cube" 
                fadeIn='half'
            />

        </div>
    );
};
