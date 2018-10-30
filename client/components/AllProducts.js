import React, {Component} from 'react'
import {fetchProducts} from '../store'
import {connect} from 'react-redux'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchInitialProducts()
  }
  render() {
    const products = this.props.products
    return (
      <div>
        {products.map(product => <div key={product.id}>{product.name}</div>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
