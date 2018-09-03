import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";

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

    handleSameClick(answer) {
        this.setState({
            same: answer
        })
    }

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
                <div>
                    <h2>Same as Guardian</h2>
                    <h4 onClick={() => this.handleSameClick(false)} >No</h4>
                    <h4 onClick={() => this.handleSameClick(true)}  >Yes</h4>
                </div>
                <section>
                    <div>
                        <h2>Please Add Emergency Contact Info</h2>
                        <h3>First Name</h3>
                        <input
                            type="text"
                            onChange={(e) => this.handleUpdate({ what: 'first_name', val: e.target.value })}
                            value={first_name}
                        />
                        <h3>Last Name</h3>
                        <input
                            type="text"
                            onChange={(e) => this.handleUpdate({ what: 'last_name', val: e.target.value })}
                            value={last_name}
                        />
                        <h3>Email</h3>
                        <input
                            type="text"
                            onChange={(e) => this.handleUpdate({ what: 'email', val: e.target.value })}
                            value={email}
                        />
                        <h3>Cell Phone</h3>
                        <input
                            type="text"
                            onChange={(e) => this.handleUpdate({ what: 'phone', val: e.target.value })}
                            value={phone}
                        />
                    </div>
                </section>
                <div>
                    <button>Add Another Emergency Contact</button>
                    {/* This will */}
                </div>
                <div>
                    <Link to="/user/register/5">
                        <button>Save and Continue</button>
                    </Link>
                    {/* this will either do an axios POST or PUT depending on if it was auto filled */}
                    <Link to='/user/register/3' >
                        <button>Back</button>
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
