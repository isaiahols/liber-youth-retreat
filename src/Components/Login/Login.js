import React, { Component } from 'react'

export default class Login extends Component {

    login() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env
        let url = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email%20&redirect_uri=${url}&response_type=code`


    }

    render() {
        return (
            <div>
                <h3 onClick={() => this.login()} >Login</h3>
            </div>
        )
    }
}
