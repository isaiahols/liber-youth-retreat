import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Login from '../Login/Login'

import './Nav.css';

export default class Nav extends Component {
    render() {
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
                <Link to='/' >
                    <Login />
                </Link>
            </div>
        )
    }
}
