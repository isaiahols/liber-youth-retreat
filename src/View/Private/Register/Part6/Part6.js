import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { CardElement, injectStripe } from 'react-stripe-elements';

import { updateUser, updateNestedObject, updateObjectOnState } from "../../../../Ducks/registration";
import initialState from '../../../../Ducks/initialState'

class Part6 extends Component {
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

  // // // STRIPE // // // 
  async submit(ev) {
    this.handleAllThingsAtOnce();

    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) console.log("Purchase Complete!")
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

    let one = await this.props.updateObjectOnState({ which: 'participant', content: initialState.participant });
    let two = await this.props.updateObjectOnState({ which: 'guardian', content: initialState.guardian });
    let three = await this.props.updateObjectOnState({ which: 'emergency', content: initialState.emergency });
    let four = await this.props.updateObjectOnState({ which: 'attendee', content: initialState.attendee })

  }



  render() {
    const { user } = this.props

    return (
      <div>
        {user.user_id ? (

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

            {/* this is now the checkout section */}

            <div className="checkout">
              <CardElement />
              <Link to='/user/dashboard' ><button>Cancel</button></Link>
              <Link to='/user/register/5' >
                <button>Back</button>
              </Link>
              <Link to='/user/dashboard' ><button onClick={() => this.submit()} >Register</button></Link>
            </div>

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


export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(Part6));