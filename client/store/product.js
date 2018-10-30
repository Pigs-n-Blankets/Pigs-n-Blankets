import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultState = {
  allProducts: []
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

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

const handler = {
  [GET_PRODUCTS]: (state, action) => {
    return {...state, allProducts: action.products}
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
