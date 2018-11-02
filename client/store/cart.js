import axios from 'axios'
import product from './product'
// import history from '../history'

// ACTION TYPES
const GET_CART = 'GET_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

// INITIAL STATE:
const defaultState = {
  cart: [],
  orderHistory: []
}

// ACTION CREATORS
const getCart = cart => ({type: GET_CART, cart})
const removeFromCart = productId => ({type: REMOVE_FROM_CART, productId})

// THUNK CREATORS
export const fetchCart = () => async dispatch => {
  try {
    const {data: cart} = await axios.get(`/api/cart/`)
    dispatch(getCart(cart))
  } catch (err) {
    console.error(err)
  }
}
export const deleteFromCart = productId => async dispatch => {
  try {
    await axios.delete(`/api/cart/${productId}`)
    dispatch(removeFromCart(productId))
  } catch (err) {
    console.err(err)
  }
}

export const postCart = (productId, quantity) => async dispatch => {
  await axios.post('/api/cart/', {productId, quantity})
  const {data: cart} = await axios.get(`/api/cart/`)
  dispatch(getCart(cart))
}

export const putCartUser = () => async dispatch => {
  await axios.put('/api/cart')
  const {data: cart} = await axios.get(`/api/cart/`)
  dispatch(getCart(cart))
}

export const putCartQuantity = (productId, quantity) => async dispatch => {
  await axios.put(`/api/cart/quantity/${productId}`, {quantity})
  const {data: cart} = await axios.get(`/api/cart/`)
  dispatch(getCart(cart))
}

// HANDLERS
const handler = {
  [GET_CART]: (state, action) => {
    return {...state, cart: action.cart}
  },
  [REMOVE_FROM_CART]: (state, action) => {
    const newCart = state.cart.filter(
      order => order.productId !== action.productId
    )
    return {...state, cart: newCart}
  }
}

// REDUCER
export default function(state = defaultState, action) {
  if (!handler.hasOwnProperty(action.type)) {
    return state
  } else {
    return handler[action.type](state, action)
  }
}
