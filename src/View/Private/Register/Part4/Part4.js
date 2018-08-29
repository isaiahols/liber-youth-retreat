import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Part4 extends Component {
    render() {
        return (
            <div>
                <section>
                    <h1>Emergency Contact</h1>
                </section>
                <section>
                    <h2>Select one or more Saved Emergency Contact</h2>
                    {/* highlight the each selected Emergency Contact  */}
                    {/* use guardian tile builder here */}
                </section>
                <div>
                    <h2>Same as Guardian</h2>
                    <h4>No</h4>
                    <h4>Yes</h4>
                </div>
                <section>
                    <div>
                        <h2>Please Add Emergency Contact Info</h2>
                        <h3>First Name</h3>
                        <input type="text" />
                        <h3>Last Name</h3>
                        <input type="text" />
                        <h3>Email</h3>
                        <input type="text" />
                        <h3>Cell Phone</h3>
                        <input type="text" />
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
