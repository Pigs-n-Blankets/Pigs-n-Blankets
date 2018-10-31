import React, {Component} from 'react'
import {fetchProducts, fetchFilteredProducts, fetchCategories} from '../store'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  root: {

    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    // justifyContent: 'spac',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '70%',
    height: '100%'
  },
  gridListTitle: {
    // backgroundColor: theme.palette.primary.light
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
  };

  componentDidMount() {
    this.props.fetchInitialProducts()
    this.props.fetchCategories()
  }

  handleChange = event => {
    this.setState({
      category: event.target.value,
    });
    this.props.fetchFilteredProducts(event.target.value)
  };

  render() {
    const {classes, products} = this.props
    return (
      <div className={classes.root}>
        <TextField
          // id="standard-select-currency-native"
          select
          // label="Native select"
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
          {this.props.categories.map(option => (
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
    fetchFilteredProducts: (categoryName) => {
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
