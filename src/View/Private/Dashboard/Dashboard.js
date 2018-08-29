import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { updateUser } from "../../../Ducks/registration";

class Dashboard extends Component {
  componentDidMount() {
    axios.get('/api/user-data').then(resp => {
      this.props.updateUser(resp.data)
    })
  }

  render() {
    return (
      <div>
        Dashboard
        <Link to='/user/register/1' >
          <button>Register</button>
        </Link>
      </div>
    )
  }
}


export default connect(null, { updateUser })(Dashboard)