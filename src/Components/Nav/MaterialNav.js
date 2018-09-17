import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import {
    updateUser,
} from "../../Ducks/registration";

import Login from '../Login/Login'
import Logout from '../Logout/Logout'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Typography,
    Avatar,
    Grid,
    ListItem,
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import './MyBurgerMenu.css'

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    items: {
        textDecoration: 'none',
        // font: 

    }
};


class MaterialNav extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
        }
    }

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

    handleMenuClick = () => {
        const { open } = this.state;

        this.setState({
            open: !open
        })
    }


    render() {
        const { open } = this.state;
        const { classes, user } = this.props;

        const fullList = (
            <div className={classes.fullList}>
                <List>
                    <ListItem button>
                        <Link to='/' className={classes.items}>
                            <Typography variant='title'>
                                Home
                                 </Typography>
                        </Link>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <Link to='/about' className={classes.items}>
                            <Typography variant='title'>
                                About
                                    </Typography>
                        </Link>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <Link to='/contact' className={classes.items}>
                            <Typography variant='title'>
                                Contact
                                    </Typography>
                        </Link>

                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <Link to='/legal' className={classes.items}>
                            <Typography variant='title'>
                                Legal
                                    </Typography>
                        </Link>

                    </ListItem>
                    <Divider />
                    {user.user_id ? (
                        <div>
                            <ListItem button>
                                <Typography variant='title' className={classes.items}>
                                    <Logout />
                                </Typography>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <Link to='user/dashboard' className={classes.items}>
                                    <Typography variant='title'>
                                        Dashboard
                            </Typography>
                                </Link>
                            </ListItem>
                        </div>
                    ) : (
                            <ListItem button>
                                <Link to='/' className={classes.items}>
                                    <Typography variant='title' className={classes.items}>
                                        <Login />
                                    </Typography>
                                </Link>
                            </ListItem>
                        )}
                        {/* <ListItem 
                        button
                        
                            onClick={() => this.handleMenuClick()}
                        >
                        <div
                            style={{
                                height: '100px'
                            }}
                        >

                            <FontAwesomeIcon
                                icon='times'
                                size='3x'
                                // inverse
                                fixedWidth
                                id='close-icon'

                            />
                        </div>
                        </ListItem> */}
                </List>
                <Divider />
            </div>
        );



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
                            <Drawer
                                anchor="bottom"
                                open={this.state.open}
                                onClose={this.handleMenuClick}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.handleMenuClick}
                                    onKeyDown={this.handleMenuClick}
                                >
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
                                    {fullList}
                                </div>
                            </Drawer>
                        </div>

                    )}
            </div>
        )
    }
}

MaterialNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ user }) {
    return {
        user
    }
}

export default connect(mapStateToProps, { updateUser })(withStyles(styles)(MaterialNav));
