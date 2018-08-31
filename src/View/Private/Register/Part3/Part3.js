import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import { updateUser, updateNestedObject } from '../../../../Ducks/registration'

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
            }
        } = this.props

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
    const { guardian, user } = state;
    return {
        guardian,
        user
    }
}

export default connect(mapStateToProps, { updateUser, updateNestedObject })(Part3)