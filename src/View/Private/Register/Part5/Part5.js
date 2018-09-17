import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser, updateNestedObject } from "../../../../Ducks/registration";

import ParticipantTiles from '../../../../Components/TileBuilders/ParticipantTiles';
import FullTiles from "../../../../Components/TileBuilders/FullTiles";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  Grid,
  Switch,
  Typography,
  Button,
  Paper
} from '@material-ui/core';




class Part5 extends Component {
  componentDidMount() {
    if (!this.props.user.user_id) {
      axios.get('/api/user-data')
        .then(resp => {
          this.props.updateUser(resp.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  handleUpdate(updateObj) {
    let newUpdateObj = { ...updateObj, where: 'participant', }
    this.props.updateNestedObject(newUpdateObj);
  }

  handleAnswer(type, answer) {
    this.handleUpdate({ what: type, val: answer })
  }

  render() {
    const { camper, guardian, emergency } = this.props
    return (
      <div>
        <Paper
          style={{
            padding: 15,
            margin: '15px 0'
          }}
        >
          <Typography
            variant='display3'
            align='center'
            style={{
              margin: '60px 0'
            }}
          >Review Stuff</Typography>
        </Paper>
        <Paper
          style={{
            padding: 15,
            margin: '15px 0'
          }}
        >
          <Grid
            container
            spacing={8}
            direction='column'
            justify="center"
            alignItems='center'
          >
            <Grid item sx={12}>
              <Typography
                variant='display2'
                style={{
                  margin: '60px 0'
                }}
              >
                Please Confirm Info
              </Typography>
            </Grid>
            <Button
              component={Link}
              to="/user/register/1"
              color='secondary'
            >
              <ParticipantTiles
                className='tiles'
                participant={camper}
              />
            </Button>
            <Button
              component={Link}
              to="/user/register/3"
              color='secondary'
            >
              <FullTiles
                each={guardian}
              />
            </Button>
            <Button
              component={Link}
              to="/user/register/1"
              color='secondary'
            >
              <FullTiles
                each={emergency}
              />
            </Button>
          </Grid>
        </Paper>
        {/* this will have three tiles displaying the info from the last four pages that will be clickable and will take you back to that section */}
        <section>
          <h2>Please Confirm Info</h2>
        </section>

        <section>
          <h3>Would you like to receive occasional LYR updates</h3>
          <div>
            <h4 onClick={() => this.handleAnswer('email_updates', true)} >Yes</h4>
            {/* yes is default */}
            <h4 onClick={() => this.handleAnswer('email_updates', false)} >Nope</h4>
          </div>
          <h3>Would you like an email with a link to the books?</h3>
          <div>
            <h4 onClick={() => this.handleAnswer('order_books', true)} >Yes</h4>
            {/* yes is default */}
            <h4 onClick={() => this.handleAnswer('order_books', false)} >Nope</h4>
          </div>
        </section>
        <Paper
          style={{
            margin: '15px 0 0 '
          }}
        >
          {/* <Grid item xs={12}
                                style={{
                                    height: "80px",
                                }}
                            > */}
          <Grid
            container
            spacing={8}
            direction="row"
            justify="center"
            style={{
              padding: 10
            }}
            alignContent='space-around'
          >
            <Grid item>
              <Button
                component={Link}
                to="/user/dashboard"
                color='primary'
                variant="contained"
                fullWidth
              >
                Cancel
                                        </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/user/register/4"
                color='primary'
                variant="contained"
                fullWidth
              >
                Previous
                                        </Button>
            </Grid>
            <Grid item >
              <Button
                component={Link}
                to="/user/register/6"
                color='primary'
                variant="contained"
                fullWidth
              >
                Save and Continue
                                        </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { participant, user, guardian, emergency } = state;
  return {
    camper: participant,
    user,
    guardian,
    emergency
  }
}

export default connect(mapStateToProps, { updateUser, updateNestedObject })(Part5)