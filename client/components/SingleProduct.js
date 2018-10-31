import React, {Component} from 'react'
import {fetchSingleProduct} from '../store'
import {connect} from 'react-redux'
import {Loading} from './Loading'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import StarIcon from '@material-ui/icons/Star'

const styles = theme => ({
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
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  }
})

class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchInitialProduct(productId)
  }

  render() {
    const {product, classes} = this.props
    console.log(product)
    while (!product.id) {
      return <Loading />
    }
    return (
      <div>
        <div className={classes.wrapper}>
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
              <Typography>{product.rating}</Typography>
              <StarIcon className={classes.icon} />
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
        </div>
        <div className={classes.wrapper}>Reviews go here</div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialProduct: productId => {
      dispatch(fetchSingleProduct(productId))
    }
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.selectedProduct
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
