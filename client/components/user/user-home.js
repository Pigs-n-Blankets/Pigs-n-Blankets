import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {putCartUser} from '../../store'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      console.log('in the if statement!')
      this.props.putCartUser()
    }
  }
  render() {
    const {email} = this.props
    return (
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    putCartUser: () => {
      return dispatch(putCartUser())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
