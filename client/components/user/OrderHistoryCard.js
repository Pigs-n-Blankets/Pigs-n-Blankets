import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteFromCart} from '../../store'
import {Link} from 'react-router-dom'
var dateFormat = require('dateformat');

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

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
    width: '25%'
  },
  nameCell: {
    width: '25%',
    textAlign: 'right'
  },
  priceCell: {
    width: '10%'
  },
  quantityCell: {
    width: '20%',
  },
  dateCell: {
    width: '20%',
    textAlign: 'right',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '40%',
    height: 'auto'
  }
})

class OrderHistoryCard extends Component {
  render() {
    const {classes, order} = this.props
    const {product, quantity, subtotal} = order
    const { id, imgUrl, name, price, updatedAt } = product
    console.log('QUANTITIES --->', quantity)
    return (
      <TableRow>
        <TableCell className={classes.imgCell}>
          <Link to={`products/${id}`}><img src={imgUrl} className={classes.productImg} /></Link>
        </TableCell>
        <TableCell className={classes.nameCell}>
          <Typography variant="subtitle1">{name}</Typography>
        </TableCell>
        <TableCell numeric className={classes.priceCell}>
          <Typography variant="subtitle1">{`$${price}`}</Typography>
        </TableCell>
        <TableCell numeric className={classes.quantityCell}>
          <Typography variant="subtitle1">{quantity}</Typography>
        </TableCell>
        <TableCell numeric className={classes.dateCell}>
          <Typography variant="subtitle1">{dateFormat(updatedAt, "mm-dd-yyyy")}</Typography>
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
