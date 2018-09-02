import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";

import {
    updateUser,
    updateNestedObject
} from "../../../../Ducks/registration";

import './Part2.css';

class Part2 extends Component {
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
        let newUpdateObj = { ...updateObj, where: 'participant', }
        this.props.updateNestedObject(newUpdateObj);
    }

    handleSize(size) {
        this.handleUpdate({ what: 'size', val: size })
    }

    handleOrderBooks(answer) {
        this.handleUpdate({ what: 'order_books', val: answer })
    }

    render() {
        const {
            user,
            camper: {
                health_card_num,
                dietary_concerns,
                medical_concerns,
                comments
            }
        } = this.props

        return (
            <div>
                {user.user_id ? (

                    <div>
                        <section className="top">
                            <h1>More Details</h1>
                        </section>
                        <section>
                            <h2>A Few More Things</h2>
                            <h3>Upload a Photo</h3>
                            <div className="photoUploader">
                                {/* This is where React S3 Uploader */}
                            </div>
                            <div className="shirtSize">
                                <h3>T-Shirt size</h3>
                                {/* All have an onClick */}
                                <h4 onClick={() => this.handleSize('XS')} >XS</h4>
                                <h4 onClick={() => this.handleSize('S')} >S</h4>
                                <h4 onClick={() => this.handleSize('M')} >M</h4>
                                <h4 onClick={() => this.handleSize('L')} >L</h4>
                                <h4 onClick={() => this.handleSize('XL')} >XL</h4>
                            </div>
                            <div>
                                <h2>Order Books Now</h2>
                                {/* Both have an onClick */}
                                <h3 onClick={() => this.handleOrderBooks(true)} >Yes!</h3>
                                <h3 onClick={() => this.handleOrderBooks(false)} >No, not right now</h3>
                            </div>
                        </section>
                        <section>
                            <div>
                                <h2>Please List ALL Dietary Concerns</h2>
                                <textarea
                                    name="Dietary Concerns"
                                    id="" cols="30"
                                    rows="5"
                                    onChange={(e) => this.handleUpdate({ what: 'dietary_concerns', val: e.target.value })}
                                    value={dietary_concerns}
                                ></textarea>
                            </div>
                            <div>
                                <h2>Please List ALL Medical Concerns</h2>
                                <textarea
                                    name="Medical Concerns"
                                    type="text"
                                    ols="30"
                                    rows="6"
                                    onChange={(e) => this.handleUpdate({ what: 'medical_concerns', val: e.target.value })}
                                    value={medical_concerns}
                                ></textarea>
                            </div>
                            <div>
                                <h2>Health Care Number</h2>
                                <input
                                    type="text"
                                    onChange={(e) => this.handleUpdate({ what: 'health_card_num', val: e.target.value })}
                                    value={health_card_num}
                                />
                            </div>
                        </section>
                        <div>
                            <h2>Anything else you want to tell us?</h2>
                            <textarea
                                name="Comments"
                                id=""
                                cols="30"
                                rows="10"
                                onChange={(e) => this.handleUpdate({ what: 'comments', val: e.target.value })}
                                value={comments}
                            ></textarea>
                        </div>
                        <div>
                            <Link to="/user/register/3">
                                <button>Save and Continue</button>
                            </Link>
                            <Link to='/user/register/1' >
                                <button>Back</button>
                            </Link>
                            <Link to='/user/dashboard' >
                                <button>Cancel</button>
                            </Link>
                        </div>
                    </div>
                ) : (
                        <div>
                            <h1>Please Sign in</h1>
                        </div >
                    )
                }
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

const mapDispatchToProps = {
    updateUser,
    updateNestedObject
}

export default connect(mapStateToProps, mapDispatchToProps)(Part2)