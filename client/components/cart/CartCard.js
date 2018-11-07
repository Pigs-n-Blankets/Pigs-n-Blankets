import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteFromCart, replaceCartQuantity} from '../../store'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import UpdateIcon from '@material-ui/icons/Update'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  productImg: {
    maxWidth: '75%',
  },
  imgCell: {
    width: '25%'
  },
  nameCell: {
    // width: '25%',
    textAlign: 'right'
  },
  priceCell: {
    // width: '20%',
  },
  quantityCell: {
    width: '10%',
    fontSize: '10px',
    textAlign: 'center'
  },
  updateCell: {
    width: '5%',
    fontSize: '10px'
  },
  removeCell: {
    width: '5%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 'auto',
    height: 'auto'
  },
  icon: {
    padding: 0,
    margin: 0
  },
  submit: {
    padding: 0,
    margin: 0
  }
})

class CartCard extends Component {
  state = {
    quantity: this.props.order.quantity
  }

  handleChange = event => {
    this.setState({
      quantity: event.target.value
    })
  }
  handleUpdate = () => {
    if (this.state.quantity >= 1) {
      this.props.replaceCartQuantity(this.props.order.id, this.state.quantity)
    } else {
      alert('quantity must be 1 or greater')
    }
  }
  render() {
    const {classes, order} = this.props
    const {product} = order
    const {imgUrl, name, price, quantity} = product
    return (
      <TableRow>
        <TableCell className={classes.imgCell}>
          <img src={imgUrl} className={classes.productImg} />
        </TableCell>
        <TableCell className={classes.nameCell}>
          <Link to={`/products/${product.id}`}>
            <Typography variant="subtitle1">{name}</Typography>
          </Link>
        </TableCell>
        <TableCell numeric className={classes.priceCell}>
          <Typography variant="subtitle1">{`$${price}`}</Typography>
        </TableCell>
        <TableCell numeric className={classes.quantityCell}>
          <TextField
            required
            className={classes.textField}
            value={this.state.quantity}
            onChange={this.handleChange}
            margin="normal"
            // variant="outlined"
          />
        </TableCell>
        <TableCell className={classes.updateCell}>
          <Button type="button" className={classes.submit}>
            <UpdateIcon className={classes.icon} onClick={this.handleUpdate} />
          </Button>
        </TableCell>
        <TableCell className={classes.removeCell}>
          <Button type="button" className={classes.submit}>
            <DeleteIcon
              className={classes.icon}
              onClick={() => this.props.deleteFromCart(order.productId)}
            />
          </Button>
        </TableCell>
      </TableRow>
    )
  }
}

CartCard.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatch = dispatch => {
  return {
    deleteFromCart: productId => {
      return dispatch(deleteFromCart(productId))
    },
    replaceCartQuantity: (orderId, quantity) => {
      dispatch(replaceCartQuantity(orderId, quantity))
    }
  }
}

export default withStyles(styles)(connect(null, mapDispatch)(CartCard))
