import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ThankYou extends Component {

    render() {
        return (
            <div>
                Thank You Page
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou)
