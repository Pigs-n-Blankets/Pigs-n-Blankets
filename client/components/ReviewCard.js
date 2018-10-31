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

const ReviewCard = props => {
  const {classes, id, rating, description, user} = props
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            User: USER IS BROKEN {user.firstName} {user.lastName}
          </Typography>
          <Typography component="p" className={classes.description}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Typography>User Rating:{rating}</Typography>
      </CardActions>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withStyles(styles)(connect(mapStateToProps)(ReviewCard))