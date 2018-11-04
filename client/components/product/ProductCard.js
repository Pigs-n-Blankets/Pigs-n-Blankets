import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Stars from '../review/Stars'
import {postCart, putCartQuantity} from '../../store/cart'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import {putProduct, deleteProduct} from '../../store'

const styles = theme => ({
  card: {
    maxWidth: 345,
    boxShadow: 'none',
    border: '1px solid #D8DEE2',
    height: '450'
  },
  media: {
    height: 250
  },
  description: {
    height: 40
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 15
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  link: {
    color: 'inherit'
  }
})

const ProductCard = props => {
  const {
    classes,
    id,
    name,
    imgUrl,
    rating,
    description,
    price,
    deleteThisProduct,
    updateThisProduct
  } = props

  function handleAddToCart() {
    let found = false
    props.cart.forEach(cart => {
      if (cart.productId === id) {
        found = true
      }
    })
    if (!found) {
      props.postCart(id, 1)
    } else {
      props.putCartQuantity(id, 1)
    }
  }

  return (
    <Card className={classes.card}>
      <Link to={`/products/${id}`} className={classes.link}>
        <CardActionArea>
          <CardMedia className={classes.media} image={imgUrl} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography component="p" className={classes.description}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className={classes.cardActions}>
        <Typography variant="h6">{`$${price}`}</Typography>
        <Button size="small" color="primary" onClick={handleAddToCart}>
          <AddShoppingCartIcon />
        </Button>
        {props.user.isAdmin ? (
          <React.Fragment>
            <Button
              onClick={() => deleteThisProduct(id)}
              size="small"
              color="primary"
            >
              <DeleteIcon />
            </Button>
            <Button size="small" color="primary">
              <EditIcon />
            </Button>
          </React.Fragment>
        ) : (
          <div>
            <Stars rating={rating} />
          </div>
        )}
      </CardActions>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateThisProduct: (product, productId) => {
      dispatch(putProduct(product, productId))
    },
    deleteThisProduct: productId => {
      dispatch(deleteProduct(productId))
    },
    postCart: (product, quantity) => {
      dispatch(postCart(product, quantity))
    },
    putCartQuantity: (productId, quantity) => {
      dispatch(putCartQuantity(productId, quantity))
    }
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ProductCard)
)
