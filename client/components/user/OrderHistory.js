import React from 'react'
import {connect} from 'react-redux'
import OrderHistoryCard from './OrderHistoryCard'
import {fetchOrderHistory} from '../../store'
var dateFormat = require('dateformat')


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
    overflowX: 'auto',
    boxShadow: 'none',
    border: '1px solid #D8DEE2',
  },
  table: {
    width: '100%',
  },
  submit: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    alignSelf: 'flex-end'
  }
})

class OrderHistory extends React.Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.fetchOrderHistory(this.props.user.id)
    }
  }

  filterOrderHistory(orderHistory) {
    if(orderHistory.length) {
      let prevDate = dateFormat(orderHistory[0].purchaseDate, 'yyyy/mm/dd')
      let filteredOrderHistory = []
      let tempArr = []

      orderHistory.forEach((order) => {
        if(dateFormat(order.purchaseDate, 'yyyy/mm/dd') === prevDate){
          tempArr.push(order)
        } else {
          filteredOrderHistory.push(tempArr)
          tempArr = []
          tempArr.push(order)
        }
        prevDate = dateFormat(order.purchaseDate, 'yyyy/mm/dd')
      })
      return filteredOrderHistory
    } else {
      return orderHistory
    }
  }

  render() {
    const {classes} = this.props
    const orderHistory = this.props.orderHistory
    return (
      this.filterOrderHistory(orderHistory).map((order, idx) => {
        return (
          <div key={idx} className={classes.wrapper}>
            <div className={classes.content}>
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell numeric>PRODUCT</TableCell>
                      <TableCell numeric>PRICE</TableCell>
                      <TableCell numeric>QUANTITY</TableCell>
                      <TableCell numeric>DATE</TableCell>
                      <TableCell numeric>STATUS</TableCell>
                      <TableCell numeric />
                      <TableCell numeric>OPTIONS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.map(item => {
                      return <OrderHistoryCard key={item.id} order={item} />
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </div>
          </div>

        )
      })
    )
  }
}

const mapState = state => {
  return {
    orderHistory: state.cart.orderHistory,
    user: state.user.currentUser,
    isLoggedIn: !!state.user.currentUser.id
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
