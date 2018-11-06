import { expect } from 'chai'
import Enzyme, { shallow } from 'enzyme'
import AllProducts from './AllProducts'
import ProductCard from './ProductCard'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'

// CREATE MOCK STORE
import thunkMiddleware from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

import { productData, categoryData } from '../../../script/seed-data.js'
import React from 'react'
import store from '../../store'



describe('<AllProducts />', () => {
  let allProducts
  const initialState = {products: productData, categories: categoryData}

  beforeEach(() => {
    // const store = mockStore(initialState)
    allProducts = shallow(<AllProducts store={store} products={productData} categories={categoryData} />).dive().dive()
  })

  it('should contain a <ProductCard />', () => {
    expect(allProducts.containsMatchingElement(ProductCard)).to.equal(true)
  })
  it('should render a <ProductCard /> component for each product in the database', () => {
    const totalProducts = productData.length;

    expect(allProducts.find(GridList)).to.have.lengthOf(1)
    expect(allProducts.find(TextField)).to.have.lengthOf(1)


    const GridListWrapper = allProducts.find(GridList).dive()

    expect(GridListWrapper.find(GridListTile)).to.have.lengthOf(1)

    // expect(allProducts.find(GridList).dive().find(GridListTile)).to.have.lengthOf(1);

    // expect(allProducts.find(GridList).dive().find(GridListTile)).to.have.lengthOf(1)
  })


});




// describe("<AllProcuts />", () => {
//   it('should render a <ProductCard /> component for each product in the database', () => {
//     const totalProducts = productData.length;
//     const allProductsWrapper = shallow(<AllProducts products={productData} categories={categoryData} classes={styles}/>)
//     // expect(allProductsWrapper.find('.classes.submit').text()).to.equal('Add Product')
//     console.log(withStyles(allProductsWrapper))
//     expect(allProductsWrapper.find(withStyles(ProductCard))).to.have.lengthOf(totalProducts)
//   })
// })
