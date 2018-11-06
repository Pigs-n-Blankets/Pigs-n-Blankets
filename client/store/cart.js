import axios from 'axios'
import product from './product'
// import history from '../history'

// ACTION TYPES
const GET_CART = 'GET_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'


// INITIAL STATE:
const defaultState = {
  cart: [],
  orderHistory: []
}

// ACTION CREATORS
const getCart = cart => ({type: GET_CART, cart})
const removeFromCart = productId => ({type: REMOVE_FROM_CART, productId})
const getOrderHistory = orders => ({type: GET_ORDER_HISTORY, orders})


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

export const deleteAllFromCart = () => async dispatch => {
  try {
    await axios.delete(`/api/cart/`)
    const {data: cart} = await axios.get(`/api/cart/`)
    dispatch(getCart(cart))
  } catch (err) {
    console.err(err)
  }
}

export const postCart = (productId, quantity) => async dispatch => {
  try {
    await axios.post('/api/cart/', {productId, quantity})
    const {data: cart} = await axios.get(`/api/cart/`)
    dispatch(getCart(cart))
  } catch (err) {
    console.err(err)
  }
}
export const putCartUser = () => async dispatch => {
  try {
    await axios.put('/api/cart')
    const {data: cart} = await axios.get(`/api/cart/`)
    dispatch(getCart(cart))
  } catch (err) {
    console.err(err)
  }
}
export const putCartQuantity = (productId, quantity) => async dispatch => {
  try {
    await axios.put(`/api/cart/quantity/${productId}`, {quantity})
    const {data: cart} = await axios.get(`/api/cart/`)
    dispatch(getCart(cart))
  } catch (err) {
    console.err(err)
  }
}
export const replaceCartQuantity = (orderId, quantity) => async dispatch => {
  try {
    await axios.put(`/api/cart/quantity/update/${orderId}`, {quantity})
    const {data: cart} = await axios.get(`/api/cart/`)
    dispatch(getCart(cart))
  } catch (err) {
    console.err(err)
  }
}
export const fetchOrderHistory = userId => async dispatch => {
  try {
    const {data: orders} = await axios.get(`/api/cart/${userId}`)
    dispatch(getOrderHistory(orders))
  } catch (err) {
    console.err(err)
  }
}
export const updateOrderOnCheckout = (userId) => async dispatch => {
  try {
    console.log('IN UPDATE ORDER ON CHECKOUT')
    await axios.put(`/api/cart/${userId}`)
    const {data: cart} = await axios.get(`/api/cart/`)
    dispatch(getCart(cart))
  } catch (err) {
    console.error(err)
  }
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
  },
  [GET_ORDER_HISTORY]: (state, action) => {
    return {...state, orderHistory: action.orders}
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
