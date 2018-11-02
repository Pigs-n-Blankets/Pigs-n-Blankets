import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Loading} from '../utils/Loading'
import {fetchCart, deleteFromCart} from '../../store'
import CartCard from './CartCard'

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
    overflowX: 'auto',
  },
  table: {
    width: '100%'
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
               // onClick={() => this.props.deleteFromCart(order.productId)}
               // {order.product.name} - {order.quantity}
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell numeric>PRODUCT</TableCell>
                  <TableCell numeric>PRICE</TableCell>
                  <TableCell numeric>QUANTITY</TableCell>
                  <TableCell numeric>REMOVE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.cart.map(order => {
                  return <CartCard key={order.id} order={order} />
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell numeric>Subtotal</TableCell>
                  <TableCell numeric>quantity</TableCell>
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
    deleteFromCart: (productId) => {
      return dispatch(deleteFromCart(productId))
    }
  }
}

export default withStyles(style)(connect(mapState, mapDispatch)(CartView))
