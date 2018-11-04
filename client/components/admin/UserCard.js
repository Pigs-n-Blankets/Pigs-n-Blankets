import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteUser, putUser} from '../../store'

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
import AdminIcon from '@material-ui/icons/AssignmentInd'
import PasswordIcon from '@material-ui/icons/LockOpen'

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

const UserCard = props => {
  const {classes, user} = props
  const {id, firstName, lastName, email, address, imageUrl, isAdmin} = user
  return (
    <Card className={classes.card}>
      <Link to={`/products/${id}`} className={classes.link}>
        <CardActionArea>
          <CardMedia className={classes.media} image={imageUrl} />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {`${firstName} ${lastName}`}
            </Typography>
            <Typography component="p" className={classes.description}>
              {email}
            </Typography>
            <Typography component="p" className={classes.description}>
              {address}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className={classes.cardActions}>
        <Button
          onClick={() => props.deleteUser(id)}
          size="small"
          color="primary"
        >
          <DeleteIcon />
        </Button>
        <Button
          onClick={() => props.putUser(id, {isAdmin: true})}
          size="small"
          color="primary"
        >
          {isAdmin ? (
            <AdminIcon color="secondary"/>
          ) : (
            <AdminIcon />
          )}
        </Button>
        <Button
          // onClick={() => deleteThisProduct(id)}
          size="small"
          color="primary"
        >
          <PasswordIcon />
        </Button>
      </CardActions>
    </Card>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: (userId) => {
      return dispatch(deleteUser(userId))
    },
    putUser: (userId, updatedUserBody) => {
      return dispatch(putUser(userId, updatedUserBody))
    }
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(UserCard)
)
