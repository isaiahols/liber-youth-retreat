import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { updateUser } from '../../Ducks/registration';
import { connect } from "react-redux";

import Login from '../Login/Login'
import Logout from '../Logout/Logout'

import './Nav.css';

class Nav extends Component {
    componentDidMount() {
        if (!this.props.user.user_id) {
            axios.get('/api/user-data')
                .then(resp => {
                    this.props.updateUser(resp.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    render() {
        const { user } = this.props;
        return (
            <div className='navBar'>

                <Link to='/' >
                    <h3>Home</h3>
                </Link>
                <Link to='/about' >
                    <h3>About</h3>
                </Link>
                <Link to='/contact' >
                    <h3>Contact Us</h3>
                </Link>
                <Link to='/legal' >
                    <h3>Legal</h3>
                </Link>
                {user.user_id ? (
                    <Logout />
                ) : (
                    <Link to='/' >
                        <Login />
                    </Link>
                    )}
            </div>
        )
    }
}


function mapStateToProps({ user }) {
    return {
        user,
    }
}

export default connect(mapStateToProps, { updateUser })(Nav)