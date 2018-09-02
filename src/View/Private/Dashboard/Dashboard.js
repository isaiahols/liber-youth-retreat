import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { updateUser } from "../../../Ducks/registration";

class Dashboard extends Component {
  componentDidMount() {
    
  }

  render() {
    const { user } = this.props
    return (
      <div>
        Dashboard
        {user.user_id ? (
          <Link to='/user/register/1' >
            <button>Register</button>
          </Link>
        ) : (
            <h1>Please Login or Register</h1>
          )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  }
}


export default connect(mapStateToProps, { updateUser })(Dashboard)