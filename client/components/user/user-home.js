import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {putCartUser} from '../../store'
import {connect} from 'react-redux'

class UserHome extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
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

const mapState = state => {
  return {
    email: state.user.currentUser.email,
    isLoggedIn: !!state.user.currentUser.id
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

UserHome.propTypes = {
  email: PropTypes.string
}
