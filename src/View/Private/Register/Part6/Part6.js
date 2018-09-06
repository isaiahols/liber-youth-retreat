import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUser, updateNestedObject, updateObjectOnState } from "../../../../Ducks/registration";
import initialState from '../../../../Ducks/initialState';
import Payment from '../../../../Components/Payments/Payment';

class Part6 extends Component {
  constructor() {
    super();

    this.state = {
      editName: false,
      newName: ''
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

  render() {
    const { user: { user_id, name }, attendee, participant: { first_name, last_name, medical_concerns, dietary_concerns } } = this.props
    const { editName, newName } = this.state;

    let userName = newName ? newName : name

    return (
      <div>
        {user_id ? (

          <div>
            <section>Legal</section>
            <section>
              <h2>Waver and legal docs</h2>
              {attendee.self_register ? (
                <div>
                  <h2>Liability Waver</h2>
                  <h3>(If 18 year of age or older)</h3>
                  <p>
                    {`I, ${first_name} ${last_name} (LYR Participant), hereby waive any legal responsibility of any and all counselors, leaders, and organizers for my safety or welfare at the Liber Youth Retreat on August 20-22, 2018.
I also give permission for the Liber Youth Retreat to use photographs, video, quotations and the first name and initial (e.g. John D.) of me for promotional purposes, including printed and electronic communications.`}
                  </p>
                </div>
              ) : (
                  <section>
                    <div>
                      {editName ? (
                        <div>
                          <input
                            type="text"
                            value={newName}
                            placeholder='Full Legal Name'
                            onChange={(e) => this.updateNewName(e)}
                          />
                          <button onClick={() => this.handleNameSubmit()} >Change</button>
                          <h5>Not You?</h5>
                        </div>
                      ) : (

                          <div>
                            <h2>Liability Waver</h2>
                            <h3>(If under 18 years of age)</h3>
                            <p>
                              {`I, ${userName}* (parent/legal guardian of Liber Youth Retreat registrant ${first_name} ${last_name}), hereby waive any legal responsibility of any and all counselors, leaders, and organizers for my child’s safety or welfare at the Liber Youth Retreat on August 20-22 2018.
      I also give permission for the Liber Youth Retreat to use photographs, video, quotations and the first name and initial (e.g. John D.) of my child for promotional purposes, including printed and electronic communications.`}
                            </p>
                            <h5 onClick={() => this.handleEdit()}>*if this is not your legal name click here to edit</h5>

                          </div>
                        )}
                      <h3>I certify this information is accurate</h3>
                      <h3>I have read and agree to this Waver</h3>
                    </div>
                    <div>
                      <h2>Medical Permission Form</h2>
                      <p>
                        {`I give permission for my child (${first_name} ${last_name}) to receive emergency medical treatment during the Liber Youth Retreat if deemed necessary by a licensed physician.`}
                      </p>
                      <h2>Medical Concerns and Conditions</h2>
                      <h3>Medical Conditions and Concerns</h3>
                      <Link to='/user/register/2'>
                        <div>
                          <h4>Medical Concerns</h4>
                          {medical_concerns}
                          <h5>click to edit</h5>
                        </div>
                      </Link>
                      <Link to='/user/register/2' >
                        <div>
                          <h4>Dietary Concerns</h4>
                          {dietary_concerns}
                          <h5>click to edit</h5>
                        </div>
                      </Link>
                      <h3>I certify that are all the information here is correct</h3>
                      <h3>I have read and agree to this Medical Permission Form</h3>
                    </div>
                  </section>
                )}
            </section>
            <section>

              <h2>Read and Sign That All Medical info is correct</h2>
            </section>

            {/* this is now the checkout section */}

            <Link to="/user/finished">
              <div onClick={() => this.handleAllThingsAtOnce()} >
                <Payment />
              </div>
            </Link>
            <Link to='/user/register/5' >
              <button>Previous</button>
            </Link>
            <Link to='/user/dashboard' >
              <button>Cancel</button>
            </Link>

          </div>
        ) : (
            <div>
              <h1>Please Sign In</h1>
            </div>
          )}
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