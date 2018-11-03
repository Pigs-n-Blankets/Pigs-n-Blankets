import React from 'react'
import {connect} from 'react-redux'
import OrderHistoryCard from './OrderHistoryCard'
import {fetchOrderHistory} from '../../store'

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

const styles = theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    width: '100%',
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
  }
})

class OrderHistory extends React.Component {
  componentDidMount() {
    if(this.props.isLoggedIn){
      console.log(this.props.user.id)
      this.props.fetchOrderHistory(this.props.user.id)
    }
  }

  render() {
    console.log('order history', this.props.orderHistory)
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
                  <TableCell numeric>QUANTITY</TableCell>
                  <TableCell numeric>PURCHASE DATE</TableCell>
                  <TableCell numeric>OPTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.orderHistory.map(order => {
                  return <OrderHistoryCard key={order.id} order={order} />
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orderHistory: state.cart.orderHistory,
    user: state.user,
    isLoggedIn: !!state.user.id,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchOrderHistory: userId => {
      return dispatch(fetchOrderHistory(userId))
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(OrderHistory))
