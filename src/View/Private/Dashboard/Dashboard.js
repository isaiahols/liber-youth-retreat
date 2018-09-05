import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import {
  updateUser,
  getParticipants,
  getGuardian,
  getEmergency,
  getCamps,
  updateObjectOnState
} from "../../../Ducks/registration";
import initialState from '../../../Ducks/initialState';


class Dashboard extends Component {
  async componentDidMount() {
    
    // Checking if Signed in
    if (!this.props.user.user_id) {
      axios.get('/api/user-data')
        .then(resp => {
          this.props.updateUser(resp.data)
        })
        .catch(err => {
          console.log(err)
        })
    }

    // Using Redux-Promise-Middleware to get data from DB to Redux Store
    this.props.getParticipants('/api/user/participant');
    this.props.getGuardian('/api/user/guardian');
    this.props.getEmergency('/api/user/emergency');
    this.props.getCamps('/api/camps')

    // Here I Am Clearing Redux for Participant and Form
    await this.props.updateObjectOnState({ which: 'participant', content: initialState.participant });
    await this.props.updateObjectOnState({ which: 'guardian', content: initialState.guardian });
    await this.props.updateObjectOnState({ which: 'emergency', content: initialState.emergency });
    await this.props.updateObjectOnState({ which: 'attendee', content: initialState.attendee })
  }

  render() {
    const { user } = this.props
    return (
      <div>
        Dashboard
        {user.user_id ? (
          <div>

            <Link to='/user/register/1' >
              <button>Register</button>
            </Link>
          </div>
          // get camps and select

        ) : (
            <h1>Please Login or Register</h1>
          )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user, camps, groups } = state;
  return {
    user,
    camps,
    groups,
  }
}

const mapDispatchToProps = {
  updateUser,
  getParticipants,
  getGuardian,
  getEmergency,
  getCamps,
  updateObjectOnState
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)