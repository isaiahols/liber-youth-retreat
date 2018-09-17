import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import {
    FormControl,
    FormControlLabel,
    FormGroup,
    Input,
    InputLabel,
    Grid,
    Switch,
    Typography,
    Button,
    Paper,
    MenuItem,
    Select,
    FormHelperText,
    withStyles,
} from '@material-ui/core';

import './ThankYou.css';

export class ThankYou extends Component {

    render() {
        return (
            <div className='thanks-page-container'>
                {/* Thank You Page
                Image goes here
                then a big Registered tile is centered underneath the big THANK YOU FOR REGISTERING */}
                <Grid
                    container
                    spacing={8}
                    direction="row"
                    justify="center"
                    style={{
                        padding: 10
                    }}
                    alignContent='space-around'
                >
                    <Button
                        component={Link}
                        to="/user/dashboard"
                        color='primary'
                        variant="contained"
                    >
                        Dashboard
                    </Button>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        camper: state.participant
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou)
