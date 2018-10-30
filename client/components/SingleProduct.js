import React, {Component} from 'react'
import {fetchSingleProduct} from '../store'
import {connect} from 'react-redux'
import {Loading} from './Loading'

class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchInitialProduct(productId)
  }

  render() {
    const {product} = this.props
    console.log(product)
    while (!product.id) {
      return <Loading />
    }
    return (
      <div>
        <img src={product.imgUrl} />
        <h2>
          {product.name} ${product.price}
        </h2>
        <p>{product.description}</p>
        <ul>
          {product.categories.map(category => (
            <li key={category.id}> {category.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialProduct: productId => {
      dispatch(fetchSingleProduct(productId))
    }
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.selectedProduct
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
