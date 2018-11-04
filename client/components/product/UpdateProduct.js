import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {putProduct} from '../../store/product'
import Button from '@material-ui/core/Button'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center'
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)'
  },
  card: {
    width: 'auto',
    boxShadow: 'none',
    border: '1px solid #D8DEE2',
    height: 'auto'
  },
  cardActionArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  media: {
    width: '100%',
    height: 280
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}

class UpdateProduct extends Component {
  constructor(props) {
    super()
    this.state = {
      name: props.product.name,
      price: props.product.price,
      description: props.product.description,
      imgUrl: props.product.imgUrl
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.updateThisProduct(this.state, this.props.productId)
  }
  render() {
    const {classes} = this.props
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <h2>
          <span>Update This Product:</span>
        </h2>
        <TextField
          name="name"
          id="filled-name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
          variant="filled"
        />
        <TextField
          name="price"
          id="filled-name"
          label="Price"
          className={classes.textField}
          value={this.state.price}
          onChange={this.handleChange}
          margin="normal"
          variant="filled"
        />
        <TextField
          name="description"
          id="filled-multiline-flexible"
          label="Description"
          multiline
          className={classes.textField}
          value={this.state.description}
          onChange={this.handleChange}
          margin="normal"
          variant="filled"
        />
        <Button
          type="Submit"
          onClick={this.handleSubmit}
          variant="outlined"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateThisProduct: (product, productId) => {
      dispatch(putProduct(product, productId))
    }
  }
}

export default withStyles(styles)(connect(null, mapDispatch)(UpdateProduct))
