import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser, updateNestedObject } from "../../../../Ducks/registration";

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

  // // // UPDATING REDUX // // //
  handleUpdate(updateObj) {
    let newUpdateObj = { ...updateObj, where: 'participant', }
    this.props.updateNestedObject(newUpdateObj);
  }

  handleAnswer(type, answer) {
    this.handleUpdate({ what: type, val: answer })
  }


  // // // HANDLING SAVE AND SUBMIT (REGISTER) // // //
  handleAllThingsAtOnce() {
    const { participant, emergency, guardian, attendee } = this.props
    axios.post(`/api/register`, { participant, emergency, guardian, attendee }).then(resp=>{

      console.log(JSON.stringify(resp.data));
    })

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
            <div>
              <Link to='/user/register/5' ><button>Cancel</button></Link>
              <Link to='/user/dashboard' ><button onClick={()=>this.handleAllThingsAtOnce()} >Register</button></Link>
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

export default connect(mapStateToProps, { updateUser, updateNestedObject })(Part6)