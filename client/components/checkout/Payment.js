import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {fetchCart, updateOrderOnCheckout} from '../../store'
import axios from 'axios'
import {connect} from 'react-redux'
const numeral = require('numeral')

import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {timingSafeEqual} from 'crypto'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    height: 100
  },
  textField: {
    paddingBottom: 0,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 0
  },
  menu: {
    width: 200
  },
  card: {
    width: '50%'
  },
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  logo: {
    width: '60px',
    height: '60px'
  },
  header: {
    display: 'flex',
    justifyContent: 'center'
  },
  creditcard: {
    padding: '40px'
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
    console.log('IN SUBMIT, EVENT -->', ev)
    let {token} = await this.props.stripe.createToken({
      email: this.state.email
    })
    console.log('IN SUBMIT, TOKEN --->', token)
    let response = await axios.post('/api/cart/checkout', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      amount: this.state.totalPrice * 1000,
      address: this.state.address,
      stripeToken: token.id
    })
    console.log('IN SUBMIT AFTER AXIOS, RESPONSE -->', response)

    this.props.updateOrderOnCheckout(this.props.user.id)

    if (response.ok) {
      console.log('Purchase Complete!')
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {classes} = this.props
    console.log(this.state.totalPrice)
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent className={classes.header}>
            <img className={classes.logo} src="/pigLogo.png" />
          </CardContent>
          <CardContent className={classes.header}>
            <Typography gutterBottom variant="h5" component="h2">
              Your order of ${this.state.totalPrice}
            </Typography>
          </CardContent>
          <CardContent className={classes.form}>
            <GridList
              cellHeight="auto"
              className={classes.gridList}
              cols={1}
              spacing={15}
            >
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
            </GridList>
          </CardContent>
          <CardElement className={classes.creditcard} />
          <CardActions className={classes.cardActions}>
            <Button type="button" onClick={this.submit}>
              Submit Payment
            </Button>
          </CardActions>
        </Card>
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

const mapDispatch = dispatch => {
  return {
    updateOrderOnCheckout: userId => {
      return dispatch(updateOrderOnCheckout(userId))
    }
  }
}

export default withStyles(styles)(
  injectStripe(connect(mapState, mapDispatch)(Payment))
)
