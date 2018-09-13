import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser, updateNestedObject } from "../../../../Ducks/registration";


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
    return (
      <div>
        <section>
          <h1>Review</h1>
        </section>
        <section>review stuff</section>
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
        <div>
          <Link to="/user/register/6">
            <button>Save and Continue</button>
          </Link>
          <Link to='/user/register/4' >
            <button>Back</button>
          </Link>
          <Link to='/user/dashboard' >
            <button>Cancel</button>
          </Link>
        </div>
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