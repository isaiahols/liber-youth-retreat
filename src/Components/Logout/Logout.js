import React from 'react'
import { connect } from "react-redux";
import { updateUser } from '../../Ducks/registration'

const Logout = (props) => {
    return (
        <div>
            <a href='http://localhost:3035/auth/logout'>
                <h3 onClick={() => props.updateUser({})}>Logout</h3>
            </a>
        </div>
    )
}

export default connect(null, { updateUser })(Logout)