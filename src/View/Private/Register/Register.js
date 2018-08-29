import React, { Component } from 'react'
import { axios } from "axios";

export default class Register extends Component {

    async componentDidMount() {
        let userData = await axios.get('/api/user-data')

        this.props.updateUser(userData.data)

    }


  render() {
    return (
      <div>
        Register
      </div>
    )
  }
}
