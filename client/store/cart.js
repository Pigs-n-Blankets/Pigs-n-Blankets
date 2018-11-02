import axios from 'axios'
// import history from '../history'

// ACTION TYPES
const GET_CART = 'GET_CART'

// INITIAL STATE:
const defaultState = {
  cart: [],
  orderHistory: []
}

// ACTION CREATORS
const getCart = cart => ({type: GET_CART, cart})

// THUNK CREATORS
export const fetchCart = () => async dispatch => {
  try {
    const {data: cart} = await axios.get(`/api/cart/`)
    dispatch(getCart(cart))
  } catch (err) {
    console.error(err)
  }
}

export const postCart = (productId, quantity) => async dispatch => {
  await axios.post('/api/cart/', {productId, quantity})
  const {data: cart} = await axios.get(`/api/cart/`)
  dispatch(getCart(cart))
}

// HANDLERS
const handler = {
  [GET_CART]: (state, action) => {
    return {...state, cart: action.cart}
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
