import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import Payment from './Payment'

class Checkout extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_ZJtjuVa3cfeO5sxWZ0s5x5lf">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <Payment />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default Checkout
