import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Stars from './Stars'
import PropTypes from 'prop-types'

// MATERIAL UI IMPORTS
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 600,
    // minWidth: 600,
  },
  avatarImg: {
    width: '200%'
  }
})

const ReviewCard = props => {
  const {classes, id, rating, description, user} = props
  const primary = `${user.firstName} ${user.lastName} ${rating} Stars`
  return (
    user.id ? (
    <div className={classes.root}>
      <Divider />
      <ListItem>
        <Avatar>
          <img className={classes.avatarImg} src={user.imageUrl} />
        </Avatar>
        <ListItemText primary={primary} secondary={description} />
      </ListItem>
    </div>) : (<div/>)
  )
}

ReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReviewCard)
