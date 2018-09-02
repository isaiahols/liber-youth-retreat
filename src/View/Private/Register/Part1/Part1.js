import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import DatePicker from 'react-mobile-datepicker';

import {
    updateUser,
    updateNestedObject,
    updateObjectOnState,
    getParticipants
} from "../../../../Ducks/registration";
import ParticipantTiles from '../../../../Components/TileBuilders/ParticipantTiles';

class Part1 extends Component {
    state = {
        time: new Date(),
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
        this.props.getParticipants('/api/user/participant')
    }


    // // // Date Picker Mobile // // // 

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

    handleUpdate(updateObj) {
        let newUpdateObj = { ...updateObj, where: 'participant', }
        this.props.updateNestedObject(newUpdateObj);
    }

    handleGender(gender) {
        this.handleUpdate({ what: 'gender', val: gender })
    }

    handleTesting() {
        console.log('let the test begin');
        this.props.getParticipants()
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
            usersParticipants
        } = this.props

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

        // // // Calling Participant Tile Builder // // //
        let mappedParticipants = usersParticipants.map(one => {
            return <ParticipantTiles key={one.participant_id} participant={one} />
        })

        return (
            <div>
                <button onClick={() => this.handleTesting()} >test Click</button>
                {user.user_id ? (
                    <div>
                        <section>
                            <h1>Begin Registration</h1>
                        </section>
                        <section className="savedParts">
                            {mappedParticipants}
                            {/* add turnery statement here to show Only if there are saved participants */}
                            <h2>Select Saved Camper or Fill Out Below to Add a New Camper</h2>
                            {/* display saved participants from participants table in db*/}
                        </section>
                        <section className="selectCamp">
                            <h1>Select a Camp</h1>
                            {/* list of camps (from camps table in db) */}
                            {/* display Camp Tiles from  */}
                        </section>
                        <section className="selectGroup">
                            <h1>Select a Group</h1>
                            {/* Group Tiles from Components/TileBuilder/GroupTiles */}
                        </section>
                        <section>
                            <div className="ParticipantFields">
                                <h3>Campers First Name</h3>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        this.handleUpdate(
                                            {
                                                what: 'first_name',
                                                val: e.target.value
                                            })
                                    }}
                                    value={first_name}
                                />
                                <h3>Campers Last Name</h3>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        this.handleUpdate(
                                            {
                                                what: 'last_name',
                                                val: e.target.value
                                            })
                                    }}
                                    value={last_name}
                                />
                                <h3>Campers Birthday</h3>

                                <a
                                    className="select-btn"
                                    onClick={this.handleClick}>
                                    Select Date
                                </a>
                                <DatePicker
                                    value={this.state.time}
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
        usersParticipants
    } = state;

    return {
        camper: participant,
        user,
        usersParticipants
    }
}

const mapDispatchToProps = {
    updateUser,
    updateNestedObject,
    updateObjectOnState,
    getParticipants
}


export default connect(mapStateToProps, mapDispatchToProps)(Part1)

