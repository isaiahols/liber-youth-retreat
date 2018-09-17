import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUser, updateNestedObject, updateObjectOnState } from "../../../../Ducks/registration";
import initialState from '../../../../Ducks/initialState';
import Payment from '../../../../Components/Payments/Payment';

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


class Part6 extends Component {
  constructor() {
    super();

    this.state = {
      editName: false,
      newName: '',
      medical: false,
      waver: false,
    }
  }

  // // // AUTHENTICATION CHECK // // //
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


  // // // UPDATING REDUX // // //
  handleUpdate(updateObj) {
    let newUpdateObj = { ...updateObj, where: 'participant', }
    this.props.updateNestedObject(newUpdateObj);
  }

  handleAnswer(type, answer) {
    this.handleUpdate({ what: type, val: answer })
  }


  // // // HANDLING SAVE AND SUBMIT (REGISTER) // // //
  async handleAllThingsAtOnce() {


    const { participant, emergency, guardian, attendee } = this.props
    let confirm = await axios.post(`/api/register`, { participant, emergency, guardian, attendee })
    console.log(JSON.stringify(confirm.data));

    this.props.updateObjectOnState({ which: 'participant', content: initialState.participant });
    this.props.updateObjectOnState({ which: 'guardian', content: initialState.guardian });
    this.props.updateObjectOnState({ which: 'emergency', content: initialState.emergency });
    this.props.updateObjectOnState({ which: 'attendee', content: initialState.attendee })

  }

  // // // EDIT USERS NAME // // // 
  handleEdit() {
    this.setState({
      editName: !this.state.editName,
      newName: ''
    })
  }

  updateNewName(e) {
    this.setState({
      newName: e.target.value
    })
  }

  handleNameSubmit() {
    axios.put(`/api/user/${this.state.newName}`)
      .then(resp => {
        console.log(resp.data);
        this.props.updateUser(resp.data)
        this.handleEdit()
      })
      .catch(err => {
        console.log('Error: ', err);

      })
  }

  // // // Waver and Medical // // // 
  handleWaver = (event) => {
    this.setState({
      waver: !this.state.waver
    })
  }
  handleMedical = (event) => {
    this.setState({
      medical: !this.state.medical
    })
  }


  render() {
    const { user: { user_id, name }, attendee, participant: { first_name, last_name, medical_concerns, dietary_concerns } } = this.props
    const { editName, newName } = this.state;

    let userName = newName ? newName : name

    return (
      <div>
        {user_id ? (

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
              >Legal</Typography>
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
                justify="space-around"
                alignItems='center'
              >
                <Grid item xs={12} >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.same}
                          onChange={this.handleWaver}
                          value="checkedB"
                          color="primary"
                        />
                      }
                      label="I have read and agree to this Waver"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Paper>
            <Paper>
              <Grid
                container
                spacing={8}
                direction='column'
                justify="space-around"
                alignItems='center'
              >
                <Grid item xs={12}>
                  <Typography variant='display2' align='center'>Medical Permission Form</Typography>
                  <Typography paragraph align='center'>
                    {`I give permission for my child (${first_name} ${last_name}) to receive emergency medical treatment during the Liber Youth Retreat if deemed necessary by a licensed physician.`}
                  </Typography>
                </Grid>
                <Grid item xs={12} >
                  <Button
                    component={Link}
                    to='/user/register/2'>
                    <Typography variant='body1' align='center'>Medical Concerns</Typography>
                    <Typography variant='body2' align='center'>
                      {medical_concerns}
                    </Typography>
                  </Button>
                </Grid>
                {/* <Typography variant='title'>click to edit</Typography> */}
                <Grid item xs={12} >
                  <Button
                    component={Link}
                    to="/user/register/2"
                  >
                    <Typography variant='body1'>Dietary Concerns</Typography>
                    <Typography variant='body2'>
                      {dietary_concerns}
                    </Typography>
                    {/* <Typography variant='title'>click to edit</Typography> */}
                  </Button>
                </Grid>
                <Grid item xs={12} >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.same}
                          onChange={this.handleMedical}
                          value="checkedB"
                          color="primary"
                        />
                      }
                      label="I have read and agree to this Medical Permission Form"
                    />
                  </FormGroup>
                </Grid>
              </Grid>

              <h3>I certify that are all the information here is correct</h3>
              <h3>I have read and agree to this Medical Permission Form</h3>
            </Paper>
            {/* this is now the checkout section */}

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
                    to="/user/register/5"
                    color='primary'
                    variant="contained"
                    fullWidth
                  >
                    Previous
                                        </Button>
                </Grid>
                <Grid item >
                  <Link to='/user/finished'>
                    <div onClick={() => this.handleAllThingsAtOnce()} >
                      <Payment />
                    </div>
                  </Link>
                </Grid>
              </Grid>
            </Paper>

          </div>
        ) : (
            <div>
              <h1>Please Sign In</h1>
            </div>
          )
        }
      </div>
    )

  }
}

function mapStateToProps(state) {
  const { participant, user, emergency, guardian, attendee } = state;
  return {
    participant,
    user,
    emergency,
    guardian,
    attendee
  }
}

const mapDispatchToProps = {
  updateUser,
  updateNestedObject,
  updateObjectOnState
}


export default connect(mapStateToProps, mapDispatchToProps)(Part6);