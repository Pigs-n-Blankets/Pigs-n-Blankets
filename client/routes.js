import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  UserAccount,
  AllProducts,
  SingleProduct,
  AddProduct,
  CartView,
  Home,
  ReviewForm,
  Dashboard,
  Orders,
  AllUsers
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    // note: when two switches are inside of a switch, only the first is considered
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products/add" component={AddProduct} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/products" component={AllProducts} />
        <Route path="/cart" component={CartView} />
        {isAdmin &&
          isLoggedIn && (
            <Switch>
              {/* Admin specific routes */}
              <Route path="/admin/orders" component={Orders} />
              <Route path="/admin" component={Dashboard} />
              <Route path="/allUsers" component={AllUsers} />

              {/* Duplicate isLoggedIn routes */}
              <Route path="/home" component={UserHome} />
              <Route path="/user" component={UserAccount} />
              <Route path="/review/:productId" component={ReviewForm} />
            </Switch>
          )}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/user" component={UserAccount} />
            <Route path="/review/:productId" component={ReviewForm} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.currentUser.id,
    isAdmin: !!state.user.currentUser.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
