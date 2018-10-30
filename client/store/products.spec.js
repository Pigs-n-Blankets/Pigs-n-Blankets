/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getProducts} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {product: {allProducts: []}}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('getProducts', () => {
//     it('dispatches GET_PRODUCTS', async () => {
//       const fakeProducts = [{name: 'myProduct'}]
//       mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
//       await store.dispatch(getProducts(fakeProducts))
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_PRODUCTS')
//       expect(actions[0].user).to.be.deep.equal(fakeProducts)
//     })
//   })
// })
