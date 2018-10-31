import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
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
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})
const addProduct = product => ({type: ADD_PRODUCT, product})
const updateProduct = product => ({type: UPDATE_PRODUCT, product})
const removeProduct = productId => ({type: DELETE_PRODUCT, productId})

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

export const fetchSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/productId/${productId}`)
    dispatch(getSingleProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const postProduct = product => async dispatch => {
  const {data} = await axios.post('/api/products/add-product', product)
  dispatch(addProduct(data))
}

export const putProduct = (product, productId) => async dispatch => {
  const {data} = await axios.put(
    `/api/products/productId/${productId}`,
    product
  )
  dispatch(updateProduct(data))
}

export const deleteProduct = productId => async dispatch => {
  await axios.delete(`/api/products/productId/${productId}`)
  dispatch(removeProduct(productId))
}

/**
 * REDUCER HANDLER
 */

const handler = {
  [GET_PRODUCTS]: (state, action) => {
    return {...state, allProducts: action.products}
  },
  [GET_SINGLE_PRODUCT]: (state, action) => {
    return {...state, selectedProduct: action.product}
  },
  [ADD_PRODUCT]: (state, action) => {
    return {...state, allProducts: [...state.allProducts, action.product]}
  },
  [UPDATE_PRODUCT]: (state, action) => {
    return {
      ...state,
      allProducts: state.allProducts.map(
        product => (product.id === action.product.id ? action.product : product)
      ),
      selectedProduct: action.product
    }
  },
  [DELETE_PRODUCT]: (state, action) => {
    return {
      ...state,
      allProducts: state.allProducts.filter(
        product => product.id !== action.productId
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
