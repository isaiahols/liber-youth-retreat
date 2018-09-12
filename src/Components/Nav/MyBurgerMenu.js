import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Paper,
    Typography
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
                        <FontAwesomeIcon
                            icon='bars'
                            size='3x'
                            inverse
                            fixedWidth
                        />
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
                                <Typography variant='title'>
                                    Home
                                 </Typography>
                            </Paper>
                            <Paper>
                                <Typography variant='title'>
                                    About
                </Typography>

                            </Paper>
                            <Paper>
                                <Typography variant='title'>
                                    Contact
                </Typography>

                            </Paper>
                            <Paper>
                                <Typography variant='title'>
                                    Legal
                </Typography>

                            </Paper>
                        </div>

                    )}
            </div>
        )
    }
}
