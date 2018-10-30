import React, {Component} from 'react'
import {fetchProducts} from '../store'
import {connect} from 'react-redux'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '70%',
    height: '100%'
  },
  gridListTitle: {
    backgroundColor: theme.palette.primary.main
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
})

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchInitialProducts()
  }
  render() {
    const {classes, products} = this.props
    return (
      <div className={classes.root}>
        <GridList
          cellHeight={230}
          className={classes.gridList}
          cols={3}
          spacing={15}
        >
          {products.map(product => (
            <GridListTile
              className={classes.gridListTitle}
              key={product.id}
              cols={1}
            >
              <h1>{product.name}</h1>
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialProducts: () => {
      dispatch(fetchProducts())
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.allProducts
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
