import React, {Component} from 'react'
import {
  fetchProducts,
  fetchFilteredProducts,
  fetchCategories
} from '../../store'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import {Link} from 'react-router-dom'

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
    justifyContent: 'space-between'
  },
  submit: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 6,
    alignSelf: 'flex-end'
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

  render() {
    const {classes, products, categories} = this.props
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
            <Link to="/products/add">
              <Button
                type="button"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Add Product
              </Button>
            </Link>
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
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.allProducts,
    categories: state.product.categories
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
