import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postProduct, fetchSingleProduct} from '../../store'
import {Link} from 'react-router-dom'

// MATERIAL UI IMPORTS
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

class EditProduct extends Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      price: 0,
      description: '',
      rating: 1,
      imgUrl: '',
      inventory: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      console.log('updated')
      this.setState({
        name: this.props.product.name,
        price: this.props.product.price,
        description: this.props.product.description,
        rating: this.props.product.rating,
        imgUrl: this.props.product.imgUrl,
        inventory: this.props.product.inventory
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRating = event => {
    this.setState({rating: event.target.value})
  }

  //   handleSubmit(event) {
//     event.preventDefault()
//     this.props.updateThisProduct(this.state, this.props.productId)
//   }

  handleSubmit(event) {
    event.preventDefault()
    const newProduct = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      rating: this.state.rating,
      imgUrl: this.state.imgUrl ? this.state.imgUrl : undefined,
      inventory: this.state.inventory
    }
    this.props.postProduct(newProduct)
    // this.setState({
    //   name: '',
    //   price: 0,
    //   description: '',
    //   rating: 1,
    //   imgUrl: '',
    //   inventory: 0
    // })
  }

  render() {
    const {classes} = this.props
    return (
      Object.keys(this.props.product).length ? (
        <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Update Product
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
              onClick={this.handleSubmit}
            >
              Add Product
            </Button>
          </CardActions>
        </Card>
      </div>
      ) : (<div/>)
    )
  }
}


// const mapDispatch = dispatch => {
//   return {
//     updateThisProduct: (product, productId) => {
//       dispatch(putProduct(product, productId))
//     }
//   }
// }
const mapState = state => {
  return {
    product: state.product.selectedProduct
  }
}
const mapDispatch = (dispatch, ownProps) => {
  const history = ownProps.history

  return {
    postProduct: product => {
      dispatch(postProduct(product)).then(() => {
        history.push('/products')
      })
    },
    fetchSingleProduct: productId => {
      dispatch(fetchSingleProduct(productId))
    },
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(EditProduct))







// import React, {Component} from 'react'
// import PropTypes from 'prop-types'
// import classNames from 'classnames'
// import {withStyles} from '@material-ui/core/styles'
// import MenuItem from '@material-ui/core/MenuItem'
// import TextField from '@material-ui/core/TextField'
// import {connect} from 'react-redux'
// import {putProduct} from '../../store/product'
// import Button from '@material-ui/core/Button'

// const styles = {
//   root: {
//     display: 'flex',
//     justifyContent: 'center'
//     // position: 'absolute',
//     // top: '50%',
//     // left: '50%',
//     // transform: 'translate(-50%, -50%)'
//   },
//   card: {
//     width: 'auto',
//     boxShadow: 'none',
//     border: '1px solid #D8DEE2',
//     height: 'auto'
//   },
//   cardActionArea: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center'
//   },
//   media: {
//     width: '100%',
//     height: 280
//   },
//   cardActions: {
//     display: 'flex',
//     justifyContent: 'flex-end'
//   }
// }

// class UpdateProduct extends Component {
//   constructor(props) {
//     super()
//     this.state = {
//       name: props.product.name,
//       price: props.product.price,
//       description: props.product.description,
//       imgUrl: props.product.imgUrl
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
//     this.props.updateThisProduct(this.state, this.props.productId)
//   }
//   render() {
//     const {classes} = this.props
//     return (
//       <form className={classes.container} noValidate autoComplete="off">
//         <h2>
//           <span>Update This Product:</span>
//         </h2>
//         <TextField
//           name="name"
//           id="filled-name"
//           label="Name"
//           className={classes.textField}
//           value={this.state.name}
//           onChange={this.handleChange}
//           margin="normal"
//           variant="filled"
//         />
//         <TextField
//           name="price"
//           id="filled-name"
//           label="Price"
//           className={classes.textField}
//           value={this.state.price}
//           onChange={this.handleChange}
//           margin="normal"
//           variant="filled"
//         />
//         <TextField
//           name="description"
//           id="filled-multiline-flexible"
//           label="Description"
//           multiline
//           className={classes.textField}
//           value={this.state.description}
//           onChange={this.handleChange}
//           margin="normal"
//           variant="filled"
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
//     updateThisProduct: (product, productId) => {
//       dispatch(putProduct(product, productId))
//     }
//   }
// }

// export default withStyles(styles)(connect(null, mapDispatch)(UpdateProduct))
