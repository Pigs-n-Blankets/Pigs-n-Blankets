import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {connect} from 'react-redux'
const numeral = require('numeral')

import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {timingSafeEqual} from 'crypto'

const styles = theme => ({
  textField: {
    paddingBottom: 0,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
})

class Payment extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      totalPrice: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    let totalPrice = 0
    console.log(this.props.cart)
    this.props.cart.forEach(order => {
      totalPrice += order.price * order.quantity
    })
    totalPrice = numeral(totalPrice).format('0,0[.]00')
    this.setState({totalPrice: totalPrice})
  }

  async submit(ev) {
    ev.preventDefault()
    let {token} = await this.props.stripe.createToken({
      email: this.state.email
    })
    let response = await axios.post('/api/cart/checkout', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      amount: this.state.totalPrice * 1000,
      address: this.state.address,
      stripeToken: token.id
    })

    if (response.ok) console.log('Purchase Complete!')
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {classes} = this.props
    console.log(this.state.totalPrice)
    return (
      <div className="checkout">
        <p>
          Would you like to complete the purchase of {this.state.totalPrice}?
        </p>
        <div>
          <TextField
            name="firstName"
            label="First Name"
            className={classes.textField}
            value={this.state.firstName}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="lastName"
            label="Last Name"
            className={classes.textField}
            value={this.state.lastName}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="address"
            label="Address"
            className={classes.textField}
            value={this.state.address}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="email"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <CardElement />

          <button type="button" onClick={this.submit}>
            Send
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart.cart,
    user: state.user.currentUser
  }
}

export default withStyles(styles)(injectStripe(connect(mapState)(Payment)))

// const onSubmit = async event => {
//   await axios.post('/api/cart/checkout', {
//     amount: event.target.data - amount,
//     name: event.target.data - name,
//     description: event.target.data - description,
//     receipt_email: 'danieleimer1@gmail.com'
//   })
// }

// const Payment = () => {
//   return (
//     <div>
//       <form action="/api/cart/checkout" method="POST">
//         <script
//           src="https://checkout.stripe.com/checkout.js"
//           className="stripe-button"
//           data-key="pk_test_ZJtjuVa3cfeO5sxWZ0s5x5lf"
//           data-amount="999"
//           data-name="Github"
//           data-description="Example charge"
//           data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
//           data-locale="auto"
//         />
//       </form>
//     </div>
//   )
// }
