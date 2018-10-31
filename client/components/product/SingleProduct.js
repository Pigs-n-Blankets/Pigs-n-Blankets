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
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  gridList: {
    width: '70%'
  },
  card: {
    maxWidth: 800,
    minWidth: 800,
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

  gridListTitle: {}
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
        <GridList
          cellHeight="auto"
          className={classes.gridList}
          cols={2}
          spacing={15}
        >
          <GridListTile className={classes.gridListTitle} cols={1}>
            {/* <ProductCard
              id={product.id}
              imgUrl={product.imgUrl}
              name={product.name}
              rating={product.rating}
              description={product.description}
              price={product.price}
            /> */}
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.media} image={product.imgUrl} />
                <CardContent className="wrapper">
                  <Typography gutterBottom variant="h3" component="h2">
                    {product.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.categories.map(category => (
                      <div key={category.id}>{category.name}</div>
                    ))}
                  </Typography>
                  <Typography component="p" className={classes.description}>
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                <Typography variant="h6">{`$${product.price}`}</Typography>
                <Stars rating={product.rating} />
                <Button size="small" color="primary">
                  Delete
                </Button>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </GridListTile>
          <GridListTile className={classes.gridListTitle} cols={1}>
            <UpdateProduct product={product} productId={product.id} />
          </GridListTile>

          <GridListTile className={classes.gridListTitle} cols={2}>
            <Reviews reviews={reviews} />
          </GridListTile>
        </GridList>
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