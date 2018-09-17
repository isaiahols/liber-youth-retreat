import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ThankYou extends Component {

    render() {
        return (
            <div>
                Thank You Page
                Image goes here
                then a big Registered tile is centered underneath the big THANK YOU FOR REGISTERING
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou)
