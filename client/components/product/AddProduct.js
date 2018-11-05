import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postProduct} from '../../store'

import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    width: '70%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    height: 100
  },
  textField: {
    paddingBottom: 0,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 0
  },
  menu: {
    width: 200
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: '',
      description: '',
      rating: 1,
      imgUrl: '',
      inventory: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRating = event => {
    this.setState({rating: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postProduct(this.state)
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Add Product
            </Typography>
          </CardContent>
          <CardContent className={classes.form}>
            <GridList
              cellHeight="auto"
              className={classes.gridList}
              cols={1}
              spacing={15}
            >
              <TextField
                name="name"
                label="Product name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="price"
                label="Price"
                className={classes.textField}
                value={this.state.price}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="description"
                label="Description"
                multiline
                rows="2"
                className={classes.textField}
                value={this.state.description}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                select
                name="rating"
                className={classes.textField}
                onChange={event => {
                  this.handleRating(event)
                }}
                value={this.state.rating}
                variant="outlined"
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText="Please rate this product"
                margin="normal"
              >
                {[1, 2, 3, 4, 5].map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                name="imgUrl"
                label="image Url"
                className={classes.textField}
                value={this.state.imgUrl}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="inventory"
                label="Inventory"
                className={classes.textField}
                value={this.state.inventory}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </GridList>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              type="button"
              // onClick={() => {this.handleSubmit(event)}}
              // color="primary"
              // className={classes.submit}
              onClick={this.handleSubmit}
            >
              Add Product
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

// const mapState = state => {
//   return {
//     user: state.user.currentUser
//   }
// }

const mapDispatch = dispatch => {
  return {
    postProduct: product => {
      dispatch(postProduct(product))
    }
  }
}

export default withStyles(styles)(connect(null, mapDispatch)(AddProduct))

// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {postProduct} from '../../store'

// import PropTypes from 'prop-types'
// import {withStyles} from '@material-ui/core/styles'
// import MenuItem from '@material-ui/core/MenuItem'
// import TextField from '@material-ui/core/TextField'
// import Button from '@material-ui/core/Button'

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
//   },
//   button: {
//     margin: theme.spacing.unit
//   }
// })

// class AddProduct extends Component {
//   constructor() {
//     super()
//     this.state = {
//       name: undefined,
//       price: undefined,
//       description: undefined,
//       imgUrl: undefined
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
//     this.props.postNewProduct(this.state)
//     this.setState({
//       name: null,
//       price: null,
//       description: null,
//       imgUrl: null
//     })
//   }
//   render() {
//     const {classes} = this.props
//     return (
//       <form className={classes.container} noValidate autoComplete="off">
//         <TextField
//           name="name"
//           id="outlined-name"
//           label="Name"
//           className={classes.textField}
//           value={this.state.name}
//           onChange={this.handleChange}
//           margin="normal"
//           variant="outlined"
//         />
//         <TextField
//           name="description"
//           id="outlined-name"
//           label="Description"
//           className={classes.textField}
//           value={this.state.description}
//           onChange={this.handleChange}
//           margin="normal"
//           variant="outlined"
//         />
//         <Button
//           type="Submit"
//           onClick={this.handleSubmit}
//           variant="outlined"
//           className={classes.button}
//         >
//           Submit
//         </Button>
//       </form>
//     )
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     postNewProduct: product => {
//       dispatch(postProduct(product))
//     }
//   }
// }

// AddProduct.propTypes = {
//   classes: PropTypes.object.isRequired
// }

// export default withStyles(styles)(connect(null, mapDispatch)(AddProduct))
