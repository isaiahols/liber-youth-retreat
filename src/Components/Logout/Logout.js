import React from 'react'
import { connect } from "react-redux";
import { updateUser } from '../../Ducks/registration'

const Logout = (props) => {
    return (
        <div>
            <a href={process.env.REACT_APP_LOGOUT}>
                <h3 onClick={() => props.updateUser({})}>Logout</h3>
            </a>
        </div>
    )
}

export default connect(null, { updateUser })(Logout)