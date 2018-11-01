import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../../store'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'

const style = theme => ({
  container: {

  }
})

class CartView extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    console.log('render')
    return (
      <div>
        {this.props.cart.map((order) => {
          return <li key={order.id}>{order.product.name}</li>
        })}
      </div>
    )
  }
}

const mapState = state => {
  console.log('USER ID', state.user.id)
  return {
    cart: state.cart.cart,
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => {
      return dispatch(fetchCart())
    }
  }
}

export default withStyles(style)(connect(mapState, mapDispatch)(CartView))
