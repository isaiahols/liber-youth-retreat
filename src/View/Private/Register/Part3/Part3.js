import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";

import MaskedInput from 'react-text-mask';

// Material-ui
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid'

import {
    updateUser,
    updateNestedObject,
    getGuardian
} from '../../../../Ducks/registration';

import FullTiles from "../../../../Components/TileBuilders/FullTiles";

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
            usersGuardians
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
                        <section>
                            <h1>Guardian</h1>
                        </section>
                        <section>
                            <h2>Select a Saved Guardian</h2>
                            {/* use guardian tile builder here */}
                            {mappedGuardians}
                        </section>
                        <section>
                            <div>
                                <h2>Please Add Guardian Info</h2>

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
                                    <Grid xs={12} sm={6}>

                                        <FormControl className='main-phone-container'>
                                            <InputLabel
                                                htmlFor="formatted-text-mask-input"
                                                margin="normal"
                                            >Other Phone</InputLabel>
                                            <Input
                                                onChange={(e) => this.handleUpdate({ what: 'phone_2', val: e.target.value })}
                                                value={phone_2}
                                                id="formatted-text-mask-input"
                                                inputComponent={this.TextMaskCustom}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </div>
                        </section>
                        <div>
                            <Link to="/user/register/4">
                                <button>Save and Continue</button>
                            </Link>
                            {/* this will either post or put depending on if it was auto filled */}
                            <Link to='/user/register/2' >
                                <button>Back</button>
                            </Link>
                            <Link to='/user/dashboard' >
                                <button>Cancel</button>
                            </Link>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Part3)