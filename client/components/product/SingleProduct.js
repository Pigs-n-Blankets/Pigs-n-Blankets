import React, {Component} from 'react'
import {fetchSingleProduct, fetchReviews} from '../../store'
import {connect} from 'react-redux'
import {Loading} from '../utils/Loading'
import Reviews from '../review/Reviews'
import UpdateProduct from './UpdateProduct'
import SingleProductCard from './SingleProductCard'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  grid: {
    width: '80%'
  },
  gridItem: {
    display: 'flex'
  },
  gridContent: {
    justifyContent: 'center'
  }
})

class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchInitialProduct(productId)
    this.props.fetchReviews(productId)
  }

  render() {
    console.log('REVIEWS --->', this.props.reviews)
    const {product, reviews, classes} = this.props
    if (!product.id) {
      return <Loading />
    }
    return (
      <div className={classes.wrapper}>
        <Grid container className={classes.grid} spacing={40}>
          <Grid
            item
            xs={12}
            className={`${classes.gridItem} ${classes.gridContent}`}
          >
            <SingleProductCard product={product} />
          </Grid>

          <Grid item xs={12}>
            <Reviews reviews={reviews} />
          </Grid>

          <Grid item xs={12}>
            <UpdateProduct product={product} productId={product.id} />
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
