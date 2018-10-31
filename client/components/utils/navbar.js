import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'

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
    }
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
    color: 'inherit'
  }
})

const handleSubmit = event => {
  event.preventDefault()
  const searchTerm = event.target.value
  alert('CONFIGURE ME IN HANDLESUBMIT IN NAVBAR.JS')
}

const Navbar = ({classes, handleClick, isLoggedIn}) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.navLinks}>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              Pigs 'n Blankets
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
          {isLoggedIn ? (
            <div>
              <Link to="/products" className={classes.navLinks}>
                <IconButton color="inherit">
                  <AppIcon />
                </IconButton>
              </Link>
              <Link to="/cart" className={classes.navLinks}>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
              <Link to="/user" className={classes.navLinks}>
                <IconButton aria-haspopup="true" color="inherit">
                  <AccountCircle />
                </IconButton>
              </Link>
              <a href="#" onClick={handleClick} className={classes.navLinks}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              <Link to="/products" className={classes.navLinks}>
                <IconButton color="inherit">
                  <AppIcon />
                </IconButton>
              </Link>
              <Link to="/login" className={classes.navLinks}>
                Login
              </Link>
              <Link to="/signup" className={classes.navLinks}>
                Sign Up
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

// const Navbar = ({classes, handleClick, isLoggedIn}) => {
//   return (
//     <div className={classes.root}>
//       <nav>
//         <Link to="/">Pigs 'N Blankets</Link>
//         <form onSubmit={handleSubmit}>
//           <input name="search" type="text" defaultValue="Search" />
//           <button type="submit">Search!</button>
//         </form>
//         <Link to="/products">Products</Link>
//         {isLoggedIn ? (
//           <div>
//             {/* The navbar will show these links after you log in */}
//             <Link to="/account">My Account</Link>
//             <Link to="/cart">My Cart</Link>
//             <a href="#" onClick={handleClick}>
//               Logout
//             </a>
//           </div>
//         ) : (
//           <div>
//             {/* The navbar will show these links before you log in */}
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Sign Up</Link>
//           </div>
//         )}
//       </nav>
//     </div>
//   )
// }

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
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
