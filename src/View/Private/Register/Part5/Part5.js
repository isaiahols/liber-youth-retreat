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
  Paper,
  MenuItem,
  Select,
  FormHelperText,
  withStyles,
} from '@material-ui/core';



const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    // marginBottom: theme.spacing.unit * 4,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "80%",
  },
  input: {
    margin: theme.spacing.unit,
    width: "80%",
  },
  topText: {
    minHeight: '200px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
})


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
  handleEmail = (event) => {
    this.handleUpdate({ what: 'email_updates', val: event.target.value })
  }
  handleBooks = (event) => {
    this.handleUpdate({ what: 'order_books', val: event.target.value })
  }

  render() {
    const { camper, guardian, emergency, classes } = this.props
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

        <Paper>
          <Grid
            container
            spacing={8}
            direction='column'
            justify="space-around"
            alignItems='center'
          >
            <Grid item xs={12}>
              <Typography variant='headline'>Receive Occasional Updates</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                className={classes.formControl}
                style={{
                  marginBottom: '30px'
                }}
              >
                <Select
                  aria-label="Order Books Now"
                  name="Order Books Now"
                  displayEmpty
                  className={classes.selectEmpty}
                  value={camper.email_updates}
                  onChange={this.handleEmail}
                >
                  <MenuItem value="" disabled>
                    Email Updates
                                        </MenuItem>
                  <MenuItem value={true}>Yes!</MenuItem>
                  <MenuItem value={false}>Nope</MenuItem>
                </Select>
                <FormHelperText>Order Books Now</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          {/* <h3>Would you like an email with a link to the books?</h3> */}
          {/* <div>
            <h4 onClick={() => this.handleAnswer('order_books', true)} >Yes</h4>
            {/* yes is default */}
          {/*} <h4 onClick={() => this.handleAnswer('order_books', false)} >Nope</h4>
          </div> */}
        </Paper>
        <Paper
          style={{
            margin: '15px 0 0 '
          }}
        >
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

export default connect(mapStateToProps, { updateUser, updateNestedObject })(withStyles(styles)(Part5))