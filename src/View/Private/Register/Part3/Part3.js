import React, { Component } from 'react'

export default class Part3 extends Component {
    render() {
        return (
            <div>
                <section>
                    <h1>Guardian</h1>
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
                    <button>Save and Continue</button>
                    <button>Back</button>
                    <button>Cancel</button>
                </div>
            </div>
        )
    }
}
