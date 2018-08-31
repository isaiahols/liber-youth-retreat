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

  handleAnswer(type, gender) {
    this.handleUpdate({ what: type, val: gender })
  }


  // // // HANDLING SAVE AND SUBMIT (REGISTER) // // //
  



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
              <Link to='/user/dashboard' ><button>Cancel</button></Link>
              <Link to='/home' ><button>Register</button></Link>
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
  const { participant, user, emergency, guardian, attendants } = state;
  return {
    camper: participant,
    user,
    emergency,
    guardian,
    attendants
  }
}

export default connect(mapStateToProps, { updateUser, updateNestedObject })(Part6)