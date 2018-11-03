import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart} from '../../store'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import {fade} from '@material-ui/core/styles/colorManipulator'
import {withStyles} from '@material-ui/core/styles'
import AppIcon from '@material-ui/icons/Apps'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing.unit * 5
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    fontWeight: 300,
    letterSpacing: theme.spacing.unit * 1 / 4
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  navLinks: {
    color: 'inherit',
    fontWeight: 300
  },
  icon: {
    marginLeft: '15px'
  },
  logo: {
    width: '40px',
    paddingRight: '15px'
  },
  navLinkText: {
    fontWeight: 300,
    color: 'inherit',
    letterSpacing: theme.spacing.unit * 1 / 4
  }
})

const handleSubmit = event => {
  event.preventDefault()
  const searchTerm = event.target.value
  alert('CONFIGURE ME IN HANDLESUBMIT IN NAVBAR.JS')
}

class Navbar extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const classes = this.props.classes
    const handleClick = this.props.handleClick
    const isLoggedIn = this.props.isLoggedIn
    const cart = this.props.cart
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/" className={classes.navLinks}>
              <img className={classes.logo} src="pigLogo.png" />
            </Link>
            <Link to="/" className={classes.navLinks}>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                PIGS 'n BLANKETS
              </Typography>
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.grow} />
            <Link to="/cart" className={classes.navLinks}>
              <IconButton color="inherit">
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            <Link to="/products" className={classes.navLinks}>
              <IconButton color="inherit" className={classes.icon}>
                <AppIcon />
              </IconButton>
            </Link>
            {isLoggedIn ? (
              <div>
                <Link to="/user" className={classes.navLinks}>
                  <IconButton color="inherit" className={classes.icon}>
                    <AccountCircle />
                  </IconButton>
                </Link>
                <a href="#" onClick={handleClick} className={classes.navLinks}>
                  <Button color="inherit" className={classes.navLinkText}>
                    Logout
                  </Button>
                </a>
              </div>
            ) : (
              <div>
                <Link to="/login" className={classes.navLinks}>
                  <Button color="inherit" className={classes.navLinkText}>
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className={classes.navLinks}>
                  <Button color="inherit" className={classes.navLinkText}>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchCart: () => {
      return dispatch(fetchCart())
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar))
/**
 * PROP TYPES
 */

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
