import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Part2 extends Component {
    render() {
        return (
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
                        <h4>XS</h4>
                        <h4>S</h4>
                        <h4>M</h4>
                        <h4>L</h4>
                        <h4>XL</h4>
                    </div>
                    <div>
                        <h2>Order Books Now</h2>
                        {/* Both have an onClick */}
                        <h3>Yes!</h3>
                        <h3>No, not right now</h3>
                    </div>
                </section>
                <section>
                    <div>
                        <h2>Please List ALL Dietary Concerns</h2>
                        <textarea name="Dietary Concerns" id="" cols="30" rows="5"></textarea>
                    </div>
                    <div>
                        <h2>Please List ALL Medical Concerns</h2>
                        <textarea name="Medical Concerns" id="" cols="30" rows="6"></textarea>
                    </div>
                    <div>
                        <h2>Health Care Number</h2>
                        <input type="text" />
                    </div>
                </section>
                <div>
                    <h2>Anything else you want to tell us?</h2>
                    <textarea name="Comments" id="" cols="30" rows="10"></textarea>
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
        )
    }
}
