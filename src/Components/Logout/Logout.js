import React from 'react'
import { connect } from "react-redux";
import { updateUser } from '../../Ducks/registration'

const Logout = (props) => {
    return (
        <div className='logout-container'>
            <a
                href={process.env.REACT_APP_LOGOUT}
                className='logout-container'>
                <h3
                    onClick={() => props.updateUser({})}
                    className='logout-container'
                >Logout</h3>
            </a>
        </div>
    )
}

export default connect(null, { updateUser })(Logout)