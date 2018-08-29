import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Part3 extends Component {
    render() {
        return (
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
                        <input type="text" />
                        <h3>Last Name</h3>
                        <input type="text" />
                        <h3>Email</h3>
                        <input type="text" />
                        <h3>Main Phone</h3>
                        <input type="text" />
                        <h3>Other Phone</h3>
                        <input type="text" />
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
            </div>
        )
    }
}
