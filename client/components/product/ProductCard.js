import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Stars from '../review/Stars'
import {
  postCart,
  putCartQuantity,
  putProduct,
  deleteProduct,
  putProductQuantity
} from '../../store'

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

const styles = theme => ({
  card: {
    maxWidth: '30vw',
    boxShadow: 'none',
    border: '1px solid #D8DEE2',
    height: '450'
  },
  media: {
    height: 280
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
    inventory,
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
    props.putProductQuantity(1, id)
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
        {!props.user.isAdmin ? (
          inventory ? (
            <Button size="small" color="primary" onClick={handleAddToCart}>
              <AddShoppingCartIcon />
            </Button>
          ) : (
            <div>Out</div>
          )
        ) : (
          <div />
        )}
        {props.user.isAdmin ? (
          <React.Fragment>
            <Button
              onClick={() => deleteThisProduct(id)}
              size="small"
              color="primary"
            >
              <DeleteIcon />
            </Button>
            <Link to={`/products/update/${id}`}>
              <Button size="small" color="primary">
                <EditIcon />
              </Button>
            </Link>
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
    user: state.user.currentUser,
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
    },
    putProductQuantity: (quantity, productId) => {
      dispatch(putProductQuantity(quantity, productId))
    }
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ProductCard)
)
