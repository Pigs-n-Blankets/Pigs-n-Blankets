import React from 'react'
import {connect} from 'react-redux'
import SingleProductCard from '../product/SingleProductCard'

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
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  card: {
    width: '50vw',
    boxShadow: 'none',
    border: '1px solid #D8DEE2',
    height: 'auto'
  },
  cardActionArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: 280
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}

class ReviewForm extends React.Component {
  render() {
    const {classes, product} = this.props
    const {imgUrl} = product

    return (
      // <div className={classes.root}>
      //   <SingleProductCard type="review" product={product} />
      // </div>
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardActionArea className={classes.cardActionArea}>
            <CardMedia
              className={classes.media}
              image={imgUrl}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Leave a Review
              </Typography>
              <Typography component="p">
                We value customer feedback. Let us know what you think
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardContent className={classes.form}>
            <TextField
              id="outlined-multiline-static"
              label="Comments"
              multiline
              rows="4"
              defaultValue="Leave a review here"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </CardContent>

          <CardActions>
            <Button size="small" color="primary">
              Submit
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product.selectedProduct
  }
}

const mapDispatch = dispatch => {
  return {}
}

ReviewForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapState, mapDispatch)(ReviewForm))
