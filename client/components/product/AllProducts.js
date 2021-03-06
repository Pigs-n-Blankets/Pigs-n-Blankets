import React, {Component} from 'react'
import {
  fetchProducts,
  fetchFilteredProducts,
  fetchCategories,
  clearSearchedProducts
} from '../../store'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import {Link} from 'react-router-dom'
import history from '../../history'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    width: '80%',
    overflow: 'hidden'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  textField: {
    paddingBottom: theme.spacing.unit * 6,
    width: 200
  },
  menu: {
    width: 200
  },
  top: {
    display: 'flex',
    width: 'auto',
    justifyContent: 'space-between',
  },
  submit: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 6,
    alignSelf: 'center'
  }
})

class AllProducts extends Component {
  state = {
    category: ''
  }

  componentDidMount() {
    this.props.fetchInitialProducts()
    this.props.fetchCategories()
  }

  handleChange = event => {
    this.setState({
      category: event.target.value
    })
    this.props.fetchFilteredProducts(event.target.value)
  }

  handleClear = () => {
    this.props.clearSearchedProducts()
  }

  handleAddProduct = () => {
    history.push('/products/add')
  }

  render() {
    const {classes, categories} = this.props
    const isAdmin = this.props.user.isAdmin

    let products
    if (this.props.searchedProducts.length < 1) {
      products = this.props.products
    } else {
      products = this.props.searchedProducts
    }
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.top}>
            <TextField
              select
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.category}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Please select a product category"
              margin="normal"
            >
              <option>all</option>
              {categories.map(option => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </TextField>
            <div className={classes.buttons}>
              {this.props.searchedProducts.length > 0 ? (
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={this.handleClear}
                  className={classes.submit}
                >
                  Clear Filter
                </Button>
              ) : (
                <div />
              )}
              {isAdmin ? (
                <Button
                type="button"
                onClick={this.handleAddProduct}
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Add Product
              </Button>
              ) : (<div />)}
            </div>
          </div>
          <GridList
            cellHeight="auto"
            className={classes.gridList}
            cols={3}
            spacing={20}
          >
            {products.map(product => (
              <GridListTile
                className={classes.gridListTitle}
                key={product.id}
                cols={1}
              >
                <ProductCard
                  id={product.id}
                  imgUrl={product.imgUrl}
                  name={product.name}
                  rating={product.rating}
                  description={product.description}
                  price={product.price}
                  inventory={product.inventory}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialProducts: () => {
      dispatch(fetchProducts())
    },
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    fetchFilteredProducts: categoryName => {
      dispatch(fetchFilteredProducts(categoryName))
    },
    clearSearchedProducts: () => {
      dispatch(clearSearchedProducts())
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.allProducts,
    categories: state.product.categories,
    searchedProducts: state.product.searchedProducts,
    user: state.user.currentUser,
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
