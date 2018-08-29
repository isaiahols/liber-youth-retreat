import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Part6 extends Component {
  render() {
    return (
      <div>
        <section>Legal</section>
        <section>
          <h2>Waver and legal docs</h2>
          <h3>
            Waver parent and youth
          </h3>
        </section>
        <section>
          <h2>Read and Sign That All Medical info is correct</h2>
        </section>
        <div>
          <Link to='/user/dashboard' ><button>Cancel</button></Link>
          <Link to='/home' ><button>Register</button></Link>
        </div>

      </div>
    )
  }
}
