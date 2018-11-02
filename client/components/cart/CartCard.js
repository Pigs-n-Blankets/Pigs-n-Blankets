import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteFromCart} from '../../store'

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
    width: '15%'
  },
  quantityCell: {
    width: '25%',
    fontSize: '10px'
  },
  removeCell: {
    width: '5%',
    textAlign: 'right'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '40%',
    height: 'auto'
  }
})

class CartCard extends Component {
  state = {
    quantity: this.props.order.quantity
  }

  componentDidMount() {
    this.setState({quantity: this.props.order.quantity})
  }

  handleChange = () => {
    this.setState({
      quantity: event.target.value
    })
  }
  render() {
    if (this.state.quantity !== this.props.order.quantity) {
      this.setState({quantity: this.props.order.quantity})
    }
    const {classes, order} = this.props
    const {product} = order
    const {imgUrl, name, price, quantity} = product
    return (
      <TableRow>
        <TableCell className={classes.imgCell}>
          <img src={imgUrl} className={classes.productImg} />
        </TableCell>
        <TableCell className={classes.nameCell}>
          <Typography variant="subtitle1">{name}</Typography>
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
            variant="outlined"
          />
        </TableCell>
        <TableCell className={classes.removeCell}>
          <Button type="button" className={classes.submit}>
            <DeleteIcon
              className={classes.rightIcon}
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
    }
  }
}

export default withStyles(styles)(connect(null, mapDispatch)(CartCard))
