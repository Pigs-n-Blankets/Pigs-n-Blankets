import React from 'react'
import ReviewCard from './ReviewCard'
import {Loading} from '../utils/Loading'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    width: '80%',
    overflow: 'hidden'
  },
  gridList: {
    width: '60%',
    height: '100%'
  },
  gridListTitle: {
    // backgroundColor: theme.palette.primary.light
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  textField: {
    paddingBottom: theme.spacing.unit * 6,
    width: 200,
    alignSelf: 'flex-start'
  },
  menu: {
    width: 200
  }
})

const Reviews = props => {
  const {classes, reviews} = props
  if (!reviews[0]) {
    return <div>There are no current reviews for this product!</div>
  }
  console.log('user --->', reviews[0].user)
  return (
    <div>
      <Typography gutterBottom variant="h3" component="h2">
        Product Reviews
      </Typography>
      <List>
        {reviews.map(review => (
          <ReviewCard
            key={review.id}
            id={review.id}
            rating={review.rating}
            description={review.description}
            user={review.user}
          />
        ))}
      </List>
    </div>
  )
}

export default withStyles(styles)(Reviews)
