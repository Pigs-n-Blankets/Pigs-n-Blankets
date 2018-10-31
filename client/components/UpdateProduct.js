import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {putProduct} from '../store/product'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
})

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
  // componentDidMount() {
  //   this.setState({
  //     name:
  //   })
  // }
  handleChange(event) {
    console.log('change')
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.updateThisProduct(this.state, this.props.productId)
    this.setState({
      name: '',
      price: 0,
      description: '',
      imgUrl: ''
    })
  }
  render() {
    const {classes} = this.props
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          name="name"
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="price"
          id="outlined-name"
          label="Price"
          className={classes.textField}
          value={this.state.price}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="description"
          id="outlined-name"
          label="Description"
          className={classes.textField}
          value={this.state.description}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
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
