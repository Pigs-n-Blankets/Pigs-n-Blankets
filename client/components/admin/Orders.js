import React from 'react'
import {connect} from 'react-redux'
import OrderHistoryCard from '../user/OrderHistoryCard'
import {fetchOrders, fetchFilteredOrders, fetchUsers, fetchOrderHistory, fetchFilteredByUserOrders} from '../../store'
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
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  gridList: {
    width: '70%',
    display: 'flex',
    justifyContent: 'space-between',
    // backgroundColor: theme.palette.secondary.main
  },
  gridListTitle: {
    alignSelf: 'center',
  },
  content: {
    width: '80%',
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
  constructor() {
    super()
    this.state = {
      user: 0
    }
    this.handleAll = this.handleAll.bind(this)
    this.handleCanceled = this.handleCanceled.bind(this)
    this.handleProcessing = this.handleProcessing.bind(this)
    this.handleCompleted = this.handleCompleted.bind(this)
  }
  componentDidMount() {
    this.props.fetchOrders()
    this.props.fetchUsers()
  }

  handleAll() {
    this.props.fetchOrders()
  }

  handleCanceled() {
    this.props.fetchFilteredOrders('cancelled')
  }

  handleProcessing() {
    this.props.fetchFilteredOrders('processing')
  }

  handleCompleted() {
    this.props.fetchFilteredOrders('completed')
  }

  handleChange = event => {
    this.setState({
      user: event.target.value
    })
    this.props.fetchFilteredOrders(event.target.value)
  }


  filterOrders(orders) {
    if (orders.length) {
      let prevUserId = orders[0].userId
      let filteredOrders = []
      let tempArr = []

      orders.forEach(order => {
        if (order.userId === prevUserId) {
          tempArr.push(order)
        } else {
          filteredOrders.push(tempArr)
          tempArr = []
          tempArr.push(order)
        }
        prevUserId = order.userId
      })
      filteredOrders.push(tempArr)
      return filteredOrders
    } else {
      return orders
    }
  }

  render() {
    const {classes, orders} = this.props
    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <GridList
            cellHeight="auto"
            className={classes.gridList}
            cols={5}
            spacing={15}
          >
            <GridListTile className={classes.gridListTitle} cols={1}>
              <TextField
                select
                className={classes.textField}
                onChange={this.handleChange}
                value={this.state.name}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
              >
                <option>all</option>
                {this.props.users.map(option => (
                  <option key={option.id} value={option.id}>
                    {`${option.firstName} ${option.lastName}`}
                  </option>
                ))}
              </TextField>
            </GridListTile>
            <GridListTile className={classes.gridListTitle} cols={1}>
              <Button
                size="small"
                color="primary"
                value="all"
                onClick={this.handleAll}
              >
                All Orders
              </Button>
            </GridListTile>
            <GridListTile className={classes.gridListTitle} cols={1}>
              <Button
                size="small"
                color="primary"
                value="cancelled"
                onClick={this.handleCanceled}
              >
                Cancelled
              </Button>
            </GridListTile>
            <GridListTile className={classes.gridListTitle} cols={1}>
              <Button
                size="small"
                color="primary"
                value="processing"
                onClick={this.handleProcessing}
              >
                Processing
              </Button>
            </GridListTile>
            <GridListTile
              className={classes.gridListTitle}
              cols={1}
              onClick={this.handleCompleted}
            >
              <Button size="small" color="primary" value="completed">
                Completed
              </Button>
            </GridListTile>
          </GridList>

          {this.filterOrders(orders).map((order, idx) => {
            return (
              <Paper className={classes.root} key={idx}>
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
                    {order ? (
                      order.map(item => {
                        return (
                          <OrderHistoryCard
                            key={order.id}
                            order={item}
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
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders.orders,
    users: state.user.allUsers
  }
}
const mapDispatch = dispatch => {
  return {
    fetchOrders: () => {
      return dispatch(fetchOrders())
    },
    fetchFilteredOrders: filterCriteria => {
      dispatch(fetchFilteredOrders(filterCriteria))
    },
    fetchUsers: () => {
      dispatch(fetchUsers())
    },
    fetchOrderHistory: userId => {
      return dispatch(fetchOrderHistory(userId))
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Orders))
