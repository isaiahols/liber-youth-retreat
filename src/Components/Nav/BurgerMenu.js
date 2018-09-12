import React, { Component } from 'react'
import { fallDown as Menu } from 'react-burger-menu'

import './BurgerMenu.css';

export default class Example extends Component {
    showSettings(event) {
        event.preventDefault();
    // .
    // .
    // .
    }

    render() {
        return (
            
            <Menu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/#/about">About</a>
                <a id="contact" className="menu-item" href="/#/contact">Contact</a>
                <a id="legal" className="menu-item" href="/#/legal">Contact</a>
                <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
            </Menu>
        );
    }
}

