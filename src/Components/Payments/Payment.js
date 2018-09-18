import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { connect } from "react-redux";

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 53645
        }
    }
    onToken = (token) => {
        token.card = void 0
        axios.post('/api/payment', { token, amount: this.state.amount }).then(res => {
            console.log(res)
        })
    }

    // ...

    render() {
        return (
            // ...
            <StripeCheckout
                name="Liber Youth Retreat"
                description="Camp Registration"
                // image="http://via.placeholder.com/100x100"
                token={this.onToken}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                amount={this.state.amount}
                label= 'Register Now'
            />
        )
    }
}

const mapStateToProps=state=>{
    const {}= state
    return {

    }
}

export default connect(mapStateToProps)(Payment)