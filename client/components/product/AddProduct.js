import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postProduct} from '../../store'

import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
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
  },
  button: {
    margin: theme.spacing.unit
  }
})

class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      name: undefined,
      price: undefined,
      description: undefined,
      imgUrl: undefined
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    console.log('change')
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.postNewProduct(this.state)
    this.setState({
      name: null,
      price: null,
      description: null,
      imgUrl: null
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
    postNewProduct: product => {
      dispatch(postProduct(product))
    }
  }
}

AddProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(null, mapDispatch)(AddProduct))
