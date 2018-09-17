import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import PropTypes from 'prop-types';


import MaskedInput from 'react-text-mask';

// Material-ui
import {
    Grid,
    InputLabel,
    Input,
    FormControl,
    Paper,
    Typography,
    withStyles,
    Button,
} from '@material-ui/core'

import {
    updateUser,
    updateNestedObject,
    getGuardian
} from '../../../../Ducks/registration';

import FullTiles from "../../../../Components/TileBuilders/FullTiles";


const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
        // marginBottom: theme.spacing.unit * 4,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "80%",
    },
    input: {
        margin: theme.spacing.unit,
        width: "80%",
    },
    topText: {
        minHeight: '200px'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
})


class Part3 extends Component {
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
        // this.props.getGuardian('/api/user/guardian')
    }

    // // Phone Masked Input // //
    TextMaskCustom() {

        return (
            <MaskedInput
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                placeholderChar={'\u2000'}
                showMask
            />
        );
    }


    handleUpdate(updateObj) {
        let newUpdateObj = { ...updateObj, where: 'guardian', }
        this.props.updateNestedObject(newUpdateObj);
    }

    render() {
        const {
            user,
            guardian: {
                first_name,
                last_name,
                email,
                phone,
                phone_2
            },
            usersGuardians,
            classes
        } = this.props

        const mappedGuardians = usersGuardians.map(each => {
            const { guardian_id } = each
            return (<FullTiles
                key={guardian_id}
                each={each}
                which={'guardian'}
            />)
        })

        return (
            <div>
                {user.user_id ? (

                    <div>
                        <Paper
                            className={classes.topText}
                            style={{
                                padding: 15,
                                margin: '15px 0'
                            }}>
                            <Grid
                                container
                                spacing={8}
                                direction='column'
                                justify="center"
                                alignItems='center'
                            // alignContent='center'
                            >
                                <Grid item xs={12}>
                                    <Typography
                                        variant='display3'
                                        align='center'
                                        style={{
                                            margin: '60px 0'
                                        }}
                                    >
                                        Guardian Info
                            </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        {first_name ? (
                            <Paper
                                style={{
                                    padding: 15,
                                    margin: '15px 0'
                                }}
                            >
                                <Grid
                                    container
                                    spacing={8}
                                    direction='column'
                                    justify="center"
                                    alignItems='center'
                                >

                                    <Grid item sx={12}>
                                        <Typography
                                            variant='display2'
                                            style={{
                                                margin: '60px 0'
                                            }}
                                        >Select a Saved Guardian</Typography>
                                        {/* use guardian tile builder here */}
                                        {mappedGuardians}
                                    </Grid>
                                </Grid>
                            </Paper>
                        ) : (
                                null
                            )}
                        <Paper
                            style={{
                                padding: 15,
                                margin: '15px 0'
                            }}
                        >

                            {/* <Grid
                                container
                                spacing={8}
                                direction='column'
                                justify="center"
                                alignItems='center'
                            > */}

                            <Grid
                                container
                                spacing={8}
                                direction='column'
                                justify="space-around"
                                alignItems='center'
                            >
                                <Grid item xs={12} >
                                    <Typography
                                        variant='display2'
                                        align='center'
                                        style={{
                                            margin: '60px 0'
                                        }}
                                    >Please Add Guardian Info</Typography>
                                </Grid>
                                <Grid item xs={12} >
                                    <FormControl
                                        margin="normal"
                                        fullWidth={true}
                                    >
                                        <InputLabel>First Name*</InputLabel>
                                        <Input
                                            onChange={(e) => this.handleUpdate({ what: 'first_name', val: e.target.value })}
                                            value={first_name}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={8} sm={6} >
                                    <FormControl
                                        margin="normal"
                                        fullWidth={true}
                                    >
                                        <InputLabel>Last Name*</InputLabel>
                                        <Input
                                            onChange={(e) => this.handleUpdate({ what: 'last_name', val: e.target.value })}
                                            value={last_name}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={8} sm={6} >
                                    <FormControl
                                        margin="normal"
                                        fullWidth={true}
                                    >
                                        <InputLabel>Email*</InputLabel>
                                        <Input
                                            onChange={(e) => this.handleUpdate({ what: 'email', val: e.target.value })}
                                            value={email}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={8} sm={6}>

                                    <FormControl
                                        className={classes.formControl}
                                        margin="normal"
                                        fullWidth={true}
                                    >
                                        <InputLabel>Main Phone*</InputLabel>
                                        <Input
                                            value={phone}
                                            onChange={(e) => this.handleUpdate({ what: 'phone', val: e.target.value })}
                                            id="formatted-text-mask-input"
                                            inputComponent={this.TextMaskCustom}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={8} sm={6}>

                                    <FormControl
                                        className='main-phone-container'
                                        fullWidth={true}
                                    >
                                        <InputLabel
                                            htmlFor="formatted-text-mask-input"
                                            margin="normal"
                                        >Other Phone</InputLabel>
                                        <Input
                                            onChange={(e) => this.handleUpdate({ what: 'phone_2', val: e.target.value })}
                                            value={phone_2}
                                            id="formatted-text-mask-input"
                                            inputComponent={this.TextMaskCustom}
                                            style={{
                                                marginBottom: '35px',
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* </Grid> */}
                        </Paper>
                        <Paper
                            style={{
                                margin: '15px 0 0 '
                            }}
                        >
                            {/* <Grid item xs={12}
                                style={{
                                    height: "80px",
                                }}
                            > */}
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
                                <Grid item>
                                    <Button
                                        component={Link}
                                        to="/user/dashboard"
                                        color='primary'
                                        variant="contained"
                                        fullWidth
                                    >
                                        Cancel
                                        </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        component={Link}
                                        to="/user/register/2"
                                        color='primary'
                                        variant="contained"
                                        fullWidth
                                    >
                                        Previous
                                        </Button>
                                </Grid>
                                <Grid item >
                                    <Button
                                        component={Link}
                                        to="/user/register/4"
                                        color='primary'
                                        variant="contained"
                                        fullWidth
                                    >
                                        Save and Continue
                                        </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div >
                ) : (
                        <div>
                            <h1>Please Sign in</h1>
                        </div>
                    )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { guardian, user, usersGuardians } = state;
    return {
        guardian,
        user,
        usersGuardians
    }
}

const mapDispatchToProps = {
    updateUser,
    updateNestedObject,
    getGuardian
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Part3))