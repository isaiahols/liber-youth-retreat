import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";

import MaskedInput from 'react-text-mask';

// Material-ui
import {FormControl, FormControlLabel, FormGroup, Input, InputLabel, Grid, Switch, Typography} from '@material-ui/core'


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
                <section>
                    <h1>Emergency Contact</h1>
                </section>
                <section>
                    <h2>Select one or more Saved Emergency Contact</h2>
                    {/* highlight the each selected Emergency Contact  */}
                    {/* use guardian tile builder here */}
                    {mappedEmergency}
                </section>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.same}
                                onChange={(e)=>this.handleSameClick(e)}
                                value="checkedB"
                                color="primary"
                            />
                        }
                        label="Same As Guardian?"
                    />
                </FormGroup>
                <section>
                    {/* <div> */}
                    <h2>Please Add Emergency Contact Info</h2>
                    <Grid container >
                        <Grid item xs={12} sm={6} >
                            <FormControl
                                margin="normal"
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
                                    id="formatted-text-mask-input"
                                    inputComponent={this.TextMaskCustom}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </section>
                {/* <div>
                        <button>Add Another Emergency Contact</button>
                        This will
                    </div> */}
                <div>
                    <Link to="/user/register/5">
                        <button>Save and Continue</button>
                    </Link>
                    {/* this will either do an axios POST or PUT depending on if it was auto filled */}
                    <Link to='/user/register/3' >
                        <button>Previous</button>
                    </Link>
                    <Link to='/user/dashboard' >
                        <button>Cancel</button>
                    </Link>
                </div>
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
