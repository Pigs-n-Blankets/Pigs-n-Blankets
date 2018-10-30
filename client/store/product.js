import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultState = {
  allProducts: [],
  selectedProduct: {}
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const updateProduct = product => ({type: UPDATE_PRODUCT, product})
const removeProduct = product => ({type: DELETE_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data || defaultState))
  } catch (err) {
    console.error(err)
  }
}

export const postProduct = product => async dispatch => {
  const {data} = await axios.post('/api/products/add-product', product)
  dispatch(addProduct(data))
}

export const putProduct = (product, productId) => async dispatch => {
  const {data} = await axios.put(`api/products/productId/${productId}`, product)
  dispatch(updateProduct(data))
}

// export const deleteProductThunk = productId => async dispatch => {
//   await axios.delete(`api/products/productId`)
// }

/**
 * REDUCER HANDLER
 */

const handler = {
  [GET_PRODUCTS]: (state, action) => {
    return {...state, allProducts: action.products}
  },
  [ADD_PRODUCT]: (state, action) => {
    return {...state, allProducts: [...state.allProducts, action.product]}
  },
  [UPDATE_PRODUCT]: (state, action) => {
    return {
      ...state,
      allProducts: state.allProducts.map(
        product => (product.id === action.product.id ? action.product : product)
      )
    }
  }
}
/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  if (!handler.hasOwnProperty(action.type)) {
    return state
  } else {
    return handler[action.type](state, action)
  }
}
