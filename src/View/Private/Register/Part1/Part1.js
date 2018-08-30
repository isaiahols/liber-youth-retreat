import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { updateUser, updateParticipant } from "../../../../Ducks/registration";
import { connect } from "react-redux";

class Part1 extends Component {
    componentDidMount() {
        if (!this.props.user.user_id) {
            axios.get('/api/user-data').then(resp => {
                this.props.updateUser(resp.data)
            })
        } 

    }

    handleUpdate(updateObj) {
        this.props.updateParticipant(updateObj);
    }

    handleGender(gender) {
        this.handleUpdate({ what: 'gender', val: gender })
    }


    render() {
        const { user,
            camper: {
                first_name,
                last_name,
                birthday,
                email }
        } = this.props

        return (
            <div>
                {user.user_id ? (
                    <div>

                        <section>
                            <h1>Begin Registration</h1>
                        </section>
                        <section className="savedParts">
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
    const { participant, user } = state;
    return {
        camper: participant,
        user
    }
}

export default connect(mapStateToProps, { updateUser, updateParticipant })(Part1)