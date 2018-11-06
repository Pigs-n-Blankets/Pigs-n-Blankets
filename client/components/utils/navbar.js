import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart, fetchSearchedProducts} from '../../store'
import history from '../../history'

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
import MenuIcon from '@material-ui/icons/Menu'

// DRAWER FOR ADMIN
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import {mainListItems, secondaryListItems} from '../admin/DashboardList'

const drawerWidth = 240

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
    width: '60px',
    paddingRight: '15px'
  },
  navLinkText: {
    fontWeight: 300,
    color: 'inherit',
    letterSpacing: theme.spacing.unit * 1 / 4
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  searchButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'inherit'
  }
})

const handleSubmit = event => {
  event.preventDefault()
  const searchTerm = event.target.value
  alert('CONFIGURE ME IN HANDLESUBMIT IN NAVBAR.JS')
}

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      right: false,
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchCart()
  }

  state = {
    right: false
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    })
  }

  handleChange = event => {
    this.setState({search: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.fetchSearchedProducts(this.state.search)
    this.setState({search: ''})
    history.push('/products')
  }

  render() {
    const classes = this.props.classes
    const handleClick = this.props.handleClick
    const isLoggedIn = this.props.isLoggedIn
    const isAdmin = this.props.user.isAdmin
    const cart = this.props.cart
    //test
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Link to="/" className={classes.navLinks}>
              <img className={classes.logo} src="/pigLogo.png" />
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
              <form onSubmit={this.handleSubmit}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  value={this.state.search}
                  onChange={this.handleChange}
                />
              </form>
            </div>
            <div className={classes.grow} />
            {!isAdmin ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : (
              <div />
            )}
            {isLoggedIn ? (
              <div>
                {!isAdmin ? (
                  <Link to="/user" className={classes.navLinks}>
                    <IconButton color="inherit" className={classes.icon}>
                      <AccountCircle />
                    </IconButton>
                  </Link>
                ) : (
                  <div />
                )}
                <a href="#" onClick={handleClick} className={classes.navLinks}>
                  <Button color="inherit" className={classes.navLinkText}>
                    Logout
                  </Button>
                </a>
                {isAdmin ? (
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.toggleDrawer('right', true)}
                  >
                    <MenuIcon />
                  </IconButton>
                ) : (
                  <div />
                )}
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

        {isAdmin ? (
          <Drawer
            anchor="right"
            open={this.state.right}
            onClose={this.toggleDrawer('right', false)}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('right', false)}
              onKeyDown={this.toggleDrawer('right', false)}
            >
              <List>{mainListItems}</List>
              <Divider />
              <List>{secondaryListItems}</List>
            </div>
          </Drawer>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.currentUser.id,
    cart: state.cart.cart,
    user: state.user.currentUser,
    products: state.product.allProducts
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const history = ownProps.history

  return {
    handleClick() {
      dispatch(logout())
    },
    fetchCart: () => {
      return dispatch(fetchCart())
    },
    fetchSearchedProducts: search => {
      dispatch(fetchSearchedProducts(search))
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar))

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
