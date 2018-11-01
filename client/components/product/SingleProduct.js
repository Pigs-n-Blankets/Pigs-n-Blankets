import React, {Component} from 'react'
import {fetchSingleProduct, fetchReviews} from '../../store'
import {connect} from 'react-redux'
import {Loading} from '../utils/Loading'
import Reviews from '../review/Reviews'
import UpdateProduct from './UpdateProduct'
import ProductCard from './ProductCard'

import Stars from '../review/Stars'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
// import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  grid: {
    width: '70%',
  },
  card: {
    // maxWidth: 800,
    // minWidth: 800,
    boxShadow: 'none',
    border: '1px solid #D8DEE2'
  },
  media: {
    height: 300
  },
  description: {
    height: 40
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 24
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  gridItem: {
    border: '1px solid #D8DEE2',
    display: 'flex',
    // justifyContent: 'space-between'
  }
})

class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchInitialProduct(productId)
    this.props.fetchReviews(productId)
  }

  render() {
    const {product, reviews, classes} = this.props
    if (!product.id) {
      return <Loading />
    }
    return (
      <div className={classes.wrapper}>
        <Grid
          container
          cellHeight="auto"
          className={classes.grid}
          spacing={24}
        >
          <Grid item xs={6} className={classes.gridItem} justify="flex-start">
            <ProductCard
              id={product.id}
              imgUrl={product.imgUrl}
              name={product.name}
              rating={product.rating}
              description={product.description}
              price={product.price}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem} justify="flex-end">
            <UpdateProduct product={product} productId={product.id} />
          </Grid>

          <Grid item xs={12} className={classes.gridItem}>
            <Reviews reviews={reviews} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialProduct: productId => {
      dispatch(fetchSingleProduct(productId))
    },
    fetchReviews: productId => {
      dispatch(fetchReviews(productId))
    }
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.selectedProduct,
    reviews: state.review
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
