import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteFromCart, updateOrderStatus} from '../../store'
import {Link} from 'react-router-dom'
var dateFormat = require('dateformat')

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreIcon from '@material-ui/icons/MoreVert'
import {tmpdir} from 'os'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  productImg: {
    maxWidth: '100%'
  },
  imgCell: {
    width: '15%'
  },
  nameCell: {
    textAlign: 'right'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '40%',
    height: 'auto'
  },
  link: {
    color: 'inherit'
  }
})

class OrderHistoryCard extends Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  handleCancel = () => {
    this.props.updateOrderStatus(this.props.order.id, 'cancelled')
    this.handleClose()
  }

  handleComplete = () => {
    this.props.updateOrderStatus(this.props.order.id, 'completed')
    this.setState({currentOrder: this.props.currentOrder})
    this.handleClose()
  }

  // setProduct = () => {
  //   this.setState({ anchorEl: null });
  //   this.props.fetchSingleProduct()
  // };

  render() {
    const {classes, isAdmin, order} = this.props
    const {product, quantity, subtotal, orderStatus, purchaseDate} = order
    const {id, imgUrl, name, price, updatedAt} = product
    const {anchorEl} = this.state

    return (
      <TableRow>
        <TableCell className={classes.imgCell}>
          {isAdmin ? (
            <Link to={`../products/${id}`}>
              <img src={imgUrl} className={classes.productImg} />
            </Link>
          ) : (
            <Link to={`products/${id}`}>
              <img src={imgUrl} className={classes.productImg} />
            </Link>
          )}
        </TableCell>
        <TableCell className={classes.nameCell}>
          <Typography variant="caption">{name}</Typography>
        </TableCell>
        <TableCell numeric className={classes.priceCell}>
          <Typography variant="caption">{`$${price}`}</Typography>
        </TableCell>
        <TableCell numeric className={classes.quantityCell}>
          <Typography variant="caption">{quantity}</Typography>
        </TableCell>
        <TableCell numeric className={classes.dateCell}>
          <Typography variant="caption">
            {dateFormat(purchaseDate, 'mm/dd/yy')}
          </Typography>
        </TableCell>
        <TableCell numeric className={classes.statusCell}>
          <Typography variant="caption">{orderStatus}</Typography>
        </TableCell>
        {isAdmin ? (
          <TableCell numeric className={classes.statusCell}>
            <Typography variant="caption">{order.userId}</Typography>
          </TableCell>
        ) : (
          <TableCell numeric className={classes.statusCell} />
        )}
        <TableCell numeric className={classes.optinsCell}>
          <Button
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MoreIcon className={classes.icon} />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {isAdmin ? (
              <div>
                <MenuItem onClick={this.handleCancel}>Cancel Order</MenuItem>
                <MenuItem onClick={this.handleComplete}>
                  Complete Order
                </MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem>
                  <Link to={`/review/${id}`} className={classes.link}>
                    Review
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to={`products/${id}`} className={classes.link}>
                    Buy Again
                  </Link>
                </MenuItem>
              </div>
            )}
          </Menu>
        </TableCell>
      </TableRow>
    )
  }
}

OrderHistoryCard.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatch = dispatch => {
  return {
    deleteFromCart: productId => {
      return dispatch(deleteFromCart(productId))
    },
    updateOrderStatus: (orderId, orderStatus) => {
      return dispatch(updateOrderStatus(orderId, orderStatus))
    }
  }
}

const mapState = state => {
  return {
    currentOrder: state.orders.currentOrder
  }
}

export default withStyles(styles)(
  connect(mapState, mapDispatch)(OrderHistoryCard)
)
