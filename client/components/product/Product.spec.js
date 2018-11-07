import React from 'react'
import { expect } from 'chai'
import Enzyme, { shallow, mount } from 'enzyme'
import AllProducts from './AllProducts'
import ProductCard from './ProductCard'
import {MemoryRouter} from 'react-router'
import {Provider} from 'react-redux'
import { productData, categoryData } from '../../../script/seed-data.js'

// MOUNT IMPORTS
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
}

// CREATE MOCK STORE
import thunkMiddleware from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('<AllProducts />', () => {
  let allProducts
  const cartData = [{productId: 1}, {productId: 2}]
  const userData = {isAdmin: false}
  const initialState = {product: {allProducts: productData, categories: categoryData}, user: {currentUser: userData}, cart: {cart: cartData}}

  beforeEach(() => {
    const store = mockStore(initialState)
    allProducts = mount(<Provider store={store}><MemoryRouter><AllProducts products={productData} categories={categoryData}/></MemoryRouter></Provider>)
  })

  it('should render a <ProductCard /> component for each product in the database', () => {
    const totalProducts = productData.length;
    expect(allProducts.find(ProductCard)).to.have.lengthOf(totalProducts)
  })
});
