// import React, {Component} from 'react'
// import PropTypes from 'prop-types'
// import classNames from 'classnames'
// import {withStyles} from '@material-ui/core/styles'
// import MenuItem from '@material-ui/core/MenuItem'
// import TextField from '@material-ui/core/TextField'
// import {connect} from 'react-redux'
// import {putProduct} from '../store/product'

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap'
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit
//   },
//   dense: {
//     marginTop: 16
//   },
//   menu: {
//     width: 200
//   }
// })

// class UpdateProduct extends Component {
//   constructor() {
//     super()
//     this.state = {
//       name: '',
//       price: null,
//       description: '',
//       imgUrl: ''
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }
//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }
//   handleSubmit(event) {
//     event.preventDefault()
//     this.props.putProduct(this.state, this.props.product.id)
//   }
//   render() {
//     const {classes} = this.props
//     return (
//       <form className={classes.container} noValidate autoComplete="off">
//         <TextField
//           id="outlined-name"
//           label="Name"
//           className={classes.textField}
//           value={this.state.name}
//           onChange={this.handleChange('name')}
//           margin="normal"
//           variant="outlined"
//         />
//       </form>
//     )
//   }
// }
