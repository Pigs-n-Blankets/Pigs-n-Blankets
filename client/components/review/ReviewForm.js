import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, postReview, fetchProducts} from '../../store'
import {Link} from 'react-router-dom'

// MATERIAL UI IMPORTS
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    width: 'auto',
    boxShadow: 'none',
    border: '1px solid #D8DEE2',
    height: 'auto'
  },
  cardActionArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  media: {
    width: '100%',
    height: 280
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}

class ReviewForm extends React.Component {
  state = {
    rating: 1,
    review: ''
  }

  handleRating = event => {
    this.setState({rating: event.target.value})
  }

  handleReview = event => {
    this.setState({review: event.target.value})
  }

  handleSubmit = (event, productId) => {
    const newReview = {
      rating: this.state.rating,
      description: this.state.review
    }
    this.props.postReview(productId, newReview)
    this.props.fetchProducts()
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  render() {
    const {classes, product} = this.props
    const {imgUrl, id} = product

    return this.props.product.id ? (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardActionArea className={classes.cardActionArea}>
            <CardMedia className={classes.media} image={imgUrl} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Leave a Review
              </Typography>
              <Typography component="p">
                We value customer feedback. Let us know what you think!
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardContent className={classes.form}>
            <TextField
              select
              className={classes.textField}
              onChange={event => {
                this.handleRating(event)
              }}
              value={this.state.rating}
              variant="outlined"
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Please rate this product"
              margin="normal"
            >
              {[1, 2, 3, 4, 5].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>

            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Comments"
              multiline
              rows="2"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={event => {
                this.handleReview(event)
              }}
              value={this.state.review}
            />
          </CardContent>

          <CardActions className={classes.cardActions}>
            <Link to="/products">
              <Button
                type="button"
                onClick={() => {
                  this.handleSubmit(event, id)
                }}
              >
                Submit
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    ) : (
      <div />
    )
  }
}

const mapState = state => {
  return {
    product: state.product.selectedProduct
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => {
      dispatch(fetchSingleProduct(productId))
    },
    postReview: (productId, newReview) => {
      dispatch(postReview(productId, newReview))
    },
    fetchProducts: () => {
      dispatch(fetchProducts())
    }
  }
}

ReviewForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapState, mapDispatch)(ReviewForm))
