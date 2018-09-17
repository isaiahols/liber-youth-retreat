import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";

import MaskedInput from 'react-text-mask';

// Material-ui
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
    Paper
} from '@material-ui/core';


import {
    updateUser,
    updateNestedObject,
    getEmergency
} from '../../../../Ducks/registration'
import FullTiles from "../../../../Components/TileBuilders/FullTiles";

class Part4 extends Component {
    state = {
        same: false,
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
        // this.props.getEmergency('/api/user/emergency')
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
    // // same as toggle // //
    handleSameClick = event => {
        this.setState({ same: event.target.checked });
    };


    // handleSameClick(answer) {
    //     this.setState({
    //         same: answer
    //     })
    // }

    handleUpdate(updateObj) {
        let newUpdateObj = { ...updateObj, where: 'emergency', }
        this.props.updateNestedObject(newUpdateObj);
    }

    render() {
        let guardOrEmerg = this.state.same ? 'guardian' : 'emergency'
        const {
            first_name,
            last_name,
            email,
            phone,
        } = this.props[guardOrEmerg]
        const { usersEmergency } = this.props

        const mappedEmergency = usersEmergency.map(each => {
            const { emergency_id } = each
            return (<FullTiles
                key={emergency_id}
                each={each}
                which={'emergency'}
            />)
        })

        return (
            <div>
                <Paper
                    style={{
                        padding: 15,
                        margin: '15px 0'
                    }}
                >
                    <Typography
                        variant='display3'
                        align='center'
                        style={{
                            margin: '60px 0'
                        }}
                    >Emergency Contact</Typography>
                </Paper>
                {usersEmergency[0] ? (
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
                                >Select a Saved Emergency Contact</Typography>
                                {/* use guardian tile builder here */}
                            </Grid>
                            {mappedEmergency}
                        </Grid>
                        {/* highlight the each selected Emergency Contact  */}
                        {/* use guardian tile builder here */}
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
                    <Grid
                        container
                        spacing={8}
                        direction='column'
                        justify="space-around"
                        alignItems='center'
                    >
                        <Grid item xs={12} >
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.same}
                                            onChange={(e) => this.handleSameClick(e)}
                                            value="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Same As Guardian?"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Paper>
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
                            >Please Add Emergency Contact Info</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} >
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
                        <Grid item xs={12} sm={6} >
                            <FormControl
                                margin="normal"
                            >
                                <InputLabel>Last Name*</InputLabel>
                                <Input
                                    onChange={(e) => this.handleUpdate({ what: 'last_name', val: e.target.value })}
                                    value={last_name}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl
                                margin=""
                            >
                                <InputLabel>Email*</InputLabel>
                                <Input
                                    onChange={(e) => this.handleUpdate({ what: 'email', val: e.target.value })}
                                    value={email}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={6}>

                            <FormControl
                                className='main-phone-container'
                                margin="normal"
                            >
                                <InputLabel>Main Phone*</InputLabel>
                                <Input
                                    value={phone}
                                    onChange={(e) => this.handleUpdate({ what: 'phone', val: e.target.value })}
                                    inputComponent={this.TextMaskCustom}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>
                {/* <div>
                        <button>Add Another Emergency Contact</button>
                        This will
                    </div> */}
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
                                to="/user/register/3"
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
                                to="/user/register/5"
                                color='primary'
                                variant="contained"
                                fullWidth
                            >
                                Save and Continue
                                        </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { guardian, emergency, user, usersEmergency } = state;
    return {
        guardian,
        emergency,
        user,
        usersEmergency
    }
}

const mapDispatchToProps = {
    updateUser,
    updateNestedObject,
    getEmergency
}

export default connect(mapStateToProps, mapDispatchToProps)(Part4)
