import React from 'react'
import ReviewCard from './ReviewCard'
import {Loading} from './Loading'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    width: '70%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
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
  if (!reviews) {
    return <div>There are no current reviews for this product!</div>
  }
  return (
    <GridList
      cellHeight="auto"
      className={classes.gridList}
      cols={3}
      spacing={15}
    >
      <GridListTile className={classes.gridListTitle} cols={3}>
        <Typography gutterBottom variant="h3" component="h2">
          Product Reviews
        </Typography>
      </GridListTile>
      {reviews.map(review => (
        <GridListTile
          className={classes.gridListTitle}
          key={review.id}
          cols={1}
        >
          <ReviewCard
            id={review.id}
            rating={review.rating}
            description={review.description}
            user={review.price}
          />
        </GridListTile>
      ))}
    </GridList>
  )
}

export default withStyles(styles)(Reviews)
