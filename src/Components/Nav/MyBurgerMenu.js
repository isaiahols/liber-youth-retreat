import React, { Component } from 'react'
import { Link } from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Paper,
    Typography,
    Avatar
} from '@material-ui/core'

import './MyBurgerMenu.css'

export default class NewBurger extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
        }
    }

    handleMenuClick() {
        const { open } = this.state;

        this.setState({
            open: !open
        })
    }

    render() {
        const { open } = this.state;
        return (
            <div>
                {!open ? (
                    <div
                        className="menu-holder"
                        onClick={() => this.handleMenuClick()}
                    >
                        <Avatar
                            style={{
                                backgroundColor: '#A16E83',
                                width: 90,
                                height: 90,
                            }}
                        >

                            <FontAwesomeIcon
                                icon='bars'
                                size='3x'
                                inverse
                                fixedWidth
                            />
                        </Avatar>
                    </div>

                ) : (

                        <div className="open-menu-container">
                            <div
                                onClick={() => this.handleMenuClick()}
                            >

                                <FontAwesomeIcon
                                    icon='times'
                                    size='3x'
                                    // inverse
                                    fixedWidth
                                    id='close-icon'

                                />
                            </div>
                            <Paper>

                                <Paper>
                                    <Link to='/'>
                                        <Typography variant='title'>
                                            Home
                                 </Typography>
                                    </Link>
                                </Paper>
                                <Paper>
                                    <Link to='/about' >
                                        <Typography variant='title'>
                                            About
                                    </Typography>
                                    </Link>
                                </Paper>
                                <Paper>
                                    <Link to='/contact' >
                                        <Typography variant='title'>
                                            Contact
                                    </Typography>
                                    </Link>

                                </Paper>
                                <Paper>
                                    <Link to='/legal' >
                                        <Typography variant='title'>
                                            Legal
                                    </Typography>
                                    </Link>

                                </Paper>
                            </Paper>
                        </div>

                    )}
            </div>
        )
    }
}
