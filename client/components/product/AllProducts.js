import React, {Component} from 'react'
import {
  fetchProducts,
  fetchFilteredProducts,
  fetchCategories
} from '../../store'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    width: '70%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  textField: {
    paddingBottom: theme.spacing.unit * 6,
    width: 200,
    alignSelf: 'flex-start'
  },
  menu: {
    width: 200
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
          <GridList
            cellHeight="auto"
            className={classes.gridList}
            cols={3}
            spacing={15}
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
