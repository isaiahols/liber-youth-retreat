import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import {
  updateUser,
  getParticipants,
  getGuardian,
  getEmergency,
  getCamps,
  getUsersAttendees,
  updateObjectOnState
} from "../../../Ducks/registration";
import initialState from '../../../Ducks/initialState';
import UsersAttendeeTiles from '../../../Components/TileBuilders/UsersAttendeeTiles';

import RegisteredTiles from '../../../Components/TileBuilders/RegisteredTiles/RegisteredTiles';

import './Dashboard.css'

import {
  Grid,
  Typography,
  Paper
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import UserSettings from '../../../Components/UserSettings/UserSettings';


const styles = theme => ({
  tiles: {
    maxWidth: 600,
    marginTop: theme.spacing.unit,
  },
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  participants: {
    margin: `${theme.spacing.unit}px 0`,
    // background: theme.
  },
})


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
    this.props.getCamps('/api/camps');
    this.props.getUsersAttendees('/api/user/attendees');

    // Here I Am Clearing Redux for Participant and Form
    await this.props.updateObjectOnState({ which: 'participant', content: initialState.participant });
    await this.props.updateObjectOnState({ which: 'guardian', content: initialState.guardian });
    await this.props.updateObjectOnState({ which: 'emergency', content: initialState.emergency });
    await this.props.updateObjectOnState({ which: 'attendee', content: initialState.attendee })
  }

  render() {
    const { user, usersAttendees, classes } = this.props

    // const mappedAttendees = usersAttendees.map(each => {
    //   return <UsersAttendeeTiles key={each.attendee_id} each={each} />
    // })
    const mappedAttendees = usersAttendees.map(one => {
      return (<RegisteredTiles
        className='tiles'
        key={`p${one.participant_id}`}
        participant={one}
      />)
    })

    return (
      <div>
        {user.user_id ? (
          <div>
            <section className='top-area'>
              <div className="top-area-content">
                <Link to='/user/register/1' className='linking'>
                  <h1>Register</h1>
                </Link>
              </div>
            </section>
            {}
            <section>
              <Paper>
                <Grid
                  container
                  spacing={24}
                  direction='column'
                  justify="center"
                  alignItems='center'
                  className={classes.participants}
                >
                  <Grid item xs={12} >
                    <Typography
                      variant='display2'
                      align='center'
                      style={{
                        margin: '60px 0'
                      }}
                    >
                      Your Current Registration
                    </Typography>
                  </Grid>

                  {mappedAttendees}
                </Grid>
              </Paper>
            </section>
            <UserSettings/>
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
  const { user, usersAttendees } = state;
  return {
    user,
    usersAttendees

  }
}

const mapDispatchToProps = {
  updateUser,
  getParticipants,
  getGuardian,
  getEmergency,
  getCamps,
  getUsersAttendees,
  updateObjectOnState
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));