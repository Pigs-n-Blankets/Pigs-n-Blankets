import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'


const styles = theme => ({
  root: {

  },
})

class Home extends Component {

  render() {
    return (
      <div id='home'/>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Home))
