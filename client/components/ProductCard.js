import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

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
    maxWidth: 345,
    boxShadow: 'none',
    border: '1px solid #D8DEE2'
  },
  media: {
    height: 250
  },
  description: {
    height: 20
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
  const {classes, id, name, imgUrl, rating, description, price} = props
  // REVIEW: auth
  console.log('USER ---->', props.user.isAdmin);
  return (
    <Card className={classes.card}>
    <Link to={`/products/productId/${id}`} className={classes.link}>
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
        {/* <Typography>{rating}</Typography> */}
        <StarIcon className={classes.icon} />
          {props.user.isAdmin ?
          <React.Fragment>
            <Button size="small" color="primary">
              Delete
            </Button>
            <Button size="small" color="primary">
              Edit
            </Button>
          </React.Fragment> :
          null
        }

      </CardActions>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withStyles(styles)(connect(mapStateToProps)(ProductCard))
