import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Loading} from '../utils/Loading'
import {fetchCart, deleteAllFromCart} from '../../store'
import CartCard from './CartCard'
const numeral = require('numeral')

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const style = theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    overflowX: 'auto'
  },
  table: {
    width: '100%'
  },
  submit: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    alignSelf: 'flex-end'
  },
  center: {
    textAlign: 'center'
  }
})

class CartView extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      totalQuantity: 0,
      totalPrice: 0
    }
    this.handleClearCart = this.handleClearCart.bind(this)
  }
  componentDidMount() {
    this.props.fetchCart()
    this.setState({loading: false})
  }

  componentDidUpdate(previousProps, previousState) {
    let totalQuantity = 0
    let totalPrice = 0
    this.props.cart.forEach(order => {
      totalQuantity += order.quantity
      totalPrice += order.price * order.quantity
    })
    totalPrice = numeral(totalPrice).format('$ 0,0[.]00')
    if (previousState.totalQuantity !== totalQuantity) {
      this.setState({totalQuantity, totalPrice})
    }
  }

  handleClearCart() {
    this.props.deleteAllFromCart()
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell numeric>PRODUCT</TableCell>
                  <TableCell numeric>PRICE</TableCell>
                  <TableCell className={classes.center}>QUANTITY</TableCell>
                  <TableCell className={classes.center}>UPDATE</TableCell>
                  <TableCell className={classes.center}>REMOVE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!this.state.loading ? (
                  this.props.cart.map(order => {
                    return <CartCard key={order.id} order={order} />
                  })
                ) : (
                  <TableRow>
                    <TableCell />
                  </TableRow>
                )}
                <TableRow />
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell numeric>
                    <Typography variant="h6">
                      {this.state.totalPrice}
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.center}>
                    <Typography variant="h6">
                      {this.state.totalQuantity}
                    </Typography>
                  </TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={this.handleClearCart}
          >
            CLEAR CART
          </Button>
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
    },
    deleteAllFromCart: () => {
      return dispatch(deleteAllFromCart())
    }
  }
}

export default withStyles(style)(connect(mapState, mapDispatch)(CartView))
