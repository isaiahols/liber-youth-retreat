import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";

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
        this.props.getGuardian('/api/user/guardian')
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
                phone2
            },
            usersGuardians
        } = this.props

        const mappedGuardians = usersGuardians.map(each => {
            const { guardian_id, first_name, last_name, email, phone } = each
            return (<FullTiles
                key={guardian_id}
                first={first_name}
                last={last_name}
                email={email}
                phone={phone}
                which={'guardian'}
                all={each}
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
                                <h3>Main Phone</h3>
                                <input
                                    type="text"
                                    onChange={(e) => this.handleUpdate({ what: 'phone', val: e.target.value })}
                                    value={phone}
                                />
                                <h3>Other Phone</h3>
                                <input
                                    type="text"
                                    onChange={(e) => this.handleUpdate({ what: 'phone2', val: e.target.value })}
                                    value={phone2}
                                />
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