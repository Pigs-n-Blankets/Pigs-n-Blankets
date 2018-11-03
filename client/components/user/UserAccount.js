import React from 'react'
import {connect} from 'react-redux'
import UserProfile from './UserProfile'
import OrderHistory from './OrderHistory'
import {Link} from 'react-router-dom'


// MATERIAL UI IMPORTS
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    width: '70%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,

  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    borderBottom: '1px solid #D8DEE2',
    marginBottom: '2%'
  }
})

class UserAccount extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  render() {
    const {classes} = this.props
    const {value} = this.state

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <AppBar position="static" className={classes.appBar}>
            <Tabs
              fullWidth
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Profile" />
              <Tab label="Orders" />
              <Tab label="Settings" />
            </Tabs>
          </AppBar>
          {value === 0 &&
            <TabContainer>
              <UserProfile />
            </TabContainer>
          }
          {value === 1 &&
            <TabContainer>
              <OrderHistory />
            </TabContainer>
          }
          {value === 2 &&
            <TabContainer>
              Profile
              {/* add settings component here */}
            </TabContainer>
          }
        </div>
      </div>
    )
  }
}

UserAccount.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserAccount)
