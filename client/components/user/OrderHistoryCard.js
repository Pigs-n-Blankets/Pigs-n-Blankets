import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteFromCart} from '../../store'
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

  // setProduct = () => {
  //   this.setState({ anchorEl: null });
  //   this.props.fetchSingleProduct()
  // };

  render() {
    const {classes, order} = this.props
    const {product, quantity, subtotal, orderStatus} = order
    const {id, imgUrl, name, price, updatedAt} = product
    const {anchorEl} = this.state

    return (
      <TableRow>
        <TableCell className={classes.imgCell}>
          <Link to={`products/${id}`}>
            <img src={imgUrl} className={classes.productImg} />
          </Link>
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
            {dateFormat(updatedAt, 'mm-dd-yyyy')}
          </Typography>
        </TableCell>
        <TableCell numeric className={classes.statusCell}>
          <Typography variant="caption">
            {orderStatus}
          </Typography>
        </TableCell>
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
            <MenuItem>
              <Link to={`/review/${id}`}className={classes.link}>
                Review
              </Link>
            </MenuItem>
            <MenuItem
              onClick={this.handleClose}
            >
              <Link to={`products/${id}`} className={classes.link}>
                Buy Again
              </Link>
            </MenuItem>
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
    }
  }
}

export default withStyles(styles)(connect(null, mapDispatch)(OrderHistoryCard))
