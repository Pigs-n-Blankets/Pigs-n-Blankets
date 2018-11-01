import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../../store'
import CartCard from './CartCard'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const style = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    width: '70%',
  },
  submit: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    alignSelf: 'flex-end'
  }
})

class CartView extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          {this.props.cart.map(order => {
            return <CartCard key={order.id} />
          })}
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            CHECKOUT
          </Button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
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
