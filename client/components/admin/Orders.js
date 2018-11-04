import React from 'react'
import {connect} from 'react-redux'
import OrderHistoryCard from '../user/OrderHistoryCard'
import {fetchOrders} from '../../store'
import {Loading} from '../utils/Loading'

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

class Orders extends React.Component {
  componentDidMount() {
    this.props.fetchOrders()
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
                  <TableCell numeric>QUANTITY</TableCell>
                  <TableCell numeric>DATE</TableCell>
                  <TableCell numeric>STATUS</TableCell>
                  <TableCell numeric>USER</TableCell>
                  <TableCell numeric>OPTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.orders.orders ? (
                  this.props.orders.orders.map(order => {
                    return (
                      <OrderHistoryCard
                        key={order.id}
                        order={order}
                        isAdmin={true}
                      />
                    )
                  })
                ) : (
                  <div />
                )}
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
    orders: state.orders
  }
}
const mapDispatch = dispatch => {
  return {
    fetchOrders: () => {
      return dispatch(fetchOrders())
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Orders))
