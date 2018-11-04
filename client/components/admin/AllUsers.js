import React, {Component} from 'react'
import {fetchUsers} from '../../store'
import {connect} from 'react-redux'
import UserCard from './UserCard'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

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

class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const {classes, users} = this.props
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <GridList
            cellHeight="auto"
            className={classes.gridList}
            cols={4}
            spacing={10}
          >
            {users.map(user => {
              return (
                <GridListTile
                  className={classes.gridListTitle}
                  key={user.id}
                  cols={1}
                >
                  <UserCard user={user} />
                </GridListTile>
              )
            })}
          </GridList>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers())
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.allUsers
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(AllUsers)
)
