import React, { Component } from 'react'

export default class Part2 extends Component {
    render() {
        return (
            <div>
                <section className="top">
                    <h1>More Details</h1>
                </section>
                <section>
                    <h1>A Few More Things</h1>
                    <h2>Upload a Photo</h2>
                    <div className="photoUploader">
                        {/* This is where React S3 Uploader */}
                    </div>
                    <div className="shirtSize">
                        <h2>T-Shirt size</h2>
                        {/* All have an onClick */}
                        <h3>XS</h3>
                        <h3>S</h3>
                        <h3>M</h3>
                        <h3>L</h3>
                        <h3>XL</h3>
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
                    <button>Save and Continue</button>
                    <button>Back</button>
                    <button>Cancel</button>
                </div>
            </div>
        )
    }
}
