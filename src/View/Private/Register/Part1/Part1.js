import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import DatePicker from 'react-mobile-datepicker';
import MediaQuery from 'react-responsive';


import {
    updateUser,
    updateNestedObject,
    updateObjectOnState,
} from "../../../../Ducks/registration";
import ParticipantTiles from '../../../../Components/TileBuilders/ParticipantTiles';
import CampTiles from "../../../../Components/TileBuilders/CampTiles";
import GroupTiles from "../../../../Components/TileBuilders/GroupTiles";
import Flatpickr from 'react-flatpickr'

// import NumberFormat from 'react-number-format';
import MaskedInput from 'react-text-mask';

// Material-ui
// import FormControl from '@material-ui/core/FormControl';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import { Grid, FormControl, Input, InputLabel } from '@material-ui/core'


import 'flatpickr/dist/themes/dark.css'
import './Part1.css'
    ;
class Part1 extends Component {
    state = {
        time: new Date(),
        // time: `${new Date().getFullYear()} ${new Date().getMonth()} ${new Date().getDate()}`,
        isOpen: false,
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


    // // // Date Picker Mobile // // // 

    // set this to height 0 when larger tha tablet and expand height of other date picker

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleCancel = () => {
        this.setState({ isOpen: false });
    }

    handleSelect = (time) => {
        // let date = time.toString()substring(0, 11)
        this.setState({ time, isOpen: false });
        this.handleUpdate({ what: 'birthday', val: time })
    }

    // I NEED TO TURN THE DATE INTO JUST YYYY/MM/DD AND NOT TIME


    // // // Updating Reducer // // //

    handleUpdate(updateObj, where = 'participant') {
        let newUpdateObj = { ...updateObj, where }
        this.props.updateNestedObject(newUpdateObj);
    }

    handleGender(gender) {
        this.handleUpdate({ what: 'gender', val: gender })
    }

    handleClickToEdit(what) {
        let updateObj = { what, val: '' }
        this.handleUpdate(updateObj)
    }


    render() {
        const {
            user,
            camper: {
                first_name,
                last_name,
                birthday,
                email
            },
            usersParticipants,
            groups,
            camps
        } = this.props

        const { time } = this.state;

        const monthMap = {
            '01': 'Jan',
            '02': 'Feb',
            '03': 'Mar',
            '04': 'Apr',
            '05': 'May',
            '06': 'Jun',
            '07': 'Jul',
            '08': 'Aug',
            '09': 'Sep',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec',
        };

        // // // Calling Tile Builders // // //
        let mappedParticipants = usersParticipants.map(one => {
            return (<ParticipantTiles
                className='tiles'
                key={`p${one.participant_id}`}
                participant={one}
            />)
        })
        let mappedCamps = camps.map(camp => {
            return (<CampTiles
                className='tiles'
                key={`c${camp.camp_id}`}
                camp={camp}
            />)
        })
        let mappedGroups = groups.map(group => {
            return (<GroupTiles
                className='tiles'
                key={group.group_id}
                group={group}
            />)
        })

        return (
            <div>
                {user.user_id ? (
                    <div>
                        <section>
                            <h1>Begin Registration</h1>
                        </section>
                        {usersParticipants[0] ? (
                            <section className="savedParts">
                                <h2>Select Saved Camper or Fill Out Below to Add a New Camper</h2>
                                {mappedParticipants}
                            </section>

                        ) : (
                                <div>
                                    <h1>No Saved Campers</h1>
                                </div>
                            )}

                        <section>
                            <h2>Are you registering</h2>
                            <h3 onClick={() => { this.handleUpdate({ what: 'self_register', val: true }, 'attendee') }}>Yourself</h3>
                            <h3 onClick={() => { this.handleUpdate({ what: 'self_register', val: false }, 'attendee') }}>Someone In Your Guardianship</h3>
                        </section>
                        <section className="selectCamp">
                            <h1>Select a Camp</h1>
                            {mappedCamps}
                        </section>
                        <section className="selectGroup">
                            <h1>Select a Group</h1>
                            {mappedGroups}
                        </section>
                        <section>
                            <div className="ParticipantFields">
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
                                </Grid>

                                <h3>Campers Birthday</h3>


                                <MediaQuery maxWidth={768}>
                                    <button
                                        className="select-btn"
                                        onClick={this.handleClick}>
                                        Select Date
                                        </button>
                                    <input
                                        type="text"
                                        placeholder="dd/mm/yyyy"
                                        onChange={(e) => {
                                            this.handleUpdate(
                                                {
                                                    what: 'birthday',
                                                    val: e.target.value.replace('/', '')
                                                })
                                        }}
                                        value={birthday}
                                    />
                                    <DatePicker
                                        value={time}
                                        isOpen={this.state.isOpen}
                                        onSelect={this.handleSelect}
                                        onCancel={this.handleCancel}
                                        theme='android-dark'
                                        dateFormat={['YYYY', ['MM', (month) => monthMap[month]], 'DD']}
                                        confirmText='Select'
                                        cancelText='Cancel'
                                        max={new Date()}
                                        customHeader="Choose Your Birthday"
                                    />
                                </MediaQuery>
                                <MediaQuery minDeviceWidth={769} >
                                    <Flatpickr data-enable-time
                                        value={time}
                                        onChange={time => { this.setState({ time }) }}
                                        style={{
                                            altInput: true,
                                            altFormat: "F j, Y",
                                            dateFormat: "Y-m-d",
                                        }}
                                    />
                                </MediaQuery>
                                {birthday ? (
                                    <h4>helo</h4>
                                ) : (
                                        <h4>no date selected</h4>
                                    )}
                                <h3>Campers Email</h3>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        this.handleUpdate(
                                            {
                                                what: 'email',
                                                val: e.target.value
                                            })
                                    }}
                                    onClick={() => this.handleClickToEdit('email')}
                                    value={email}
                                />
                                <div>
                                    <h3>Gender</h3>
                                    <h4
                                        onClick={() => this.handleGender('female')} >Female</h4>
                                    <h4
                                        onClick={() => this.handleGender('male')} >Male</h4>
                                </div>
                            </div>
                            <div>
                                <Link to="/user/register/2">
                                    <button>Save and Continue</button>
                                </Link>
                                <Link to='/user/dashboard' >
                                    <button>Cancel</button>
                                </Link>
                            </div>
                        </section>
                    </div>
                ) : (
                        <h1>Please Sign In</h1>
                    )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        participant,
        user,
        usersParticipants,
        camps,
        groups
    } = state;

    return {
        camper: participant,
        user,
        usersParticipants,
        camps,
        groups
    }
}

const mapDispatchToProps = {
    updateUser,
    updateNestedObject,
    updateObjectOnState,
}


export default connect(mapStateToProps, mapDispatchToProps)(Part1)

