import axios from 'axios'

// ACTION TYPES
const GET_ORDERS = 'GET_ORDERS'
const GET_FILTERED_ORDERS = 'GET_FILTERED_ORDERS'

// INITIAL STATE:
const defaultState = {orders: [], currentOrder: {product: {}}}

// ACTION CREATORS
const getOrders = orders => ({type: GET_ORDERS, orders})
const getFilteredOrders = orders => ({
  type: GET_FILTERED_ORDERS,
  orders
})

// THUNK CREATORS
export const fetchOrders = () => async dispatch => {
  try {
    const {data: orders} = await axios.get(`/api/orders/admin`)
    dispatch(getOrders(orders))
  } catch (err) {
    console.error(err)
  }
}

export const updateOrderStatus = (orderId, orderStatus) => async dispatch => {
  try {
    await axios.put(`/api/orders/admin/${orderId}`, {
      orderStatus
    })
    const {data: orders} = await axios.get(`/api/orders/admin`)
    dispatch(getOrders(orders))
  } catch (err) {
    console.error(err)
  }
}

export const fetchFilteredOrders = orderStatus => async dispatch => {
  try {
    const route =
      orderStatus === 'all'
        ? `api/orders/admin`
        : `/api/orders/admin/${orderStatus}`
    const {data: orders} = await axios.get(route)
    dispatch(getFilteredOrders(orders))
  } catch (err) {
    console.error(err)
  }
}

// HANDLERS
const handler = {
  [GET_ORDERS]: (state, action) => {
    return {...state, orders: action.orders}
  },
  [GET_FILTERED_ORDERS]: (state, action) => {
    return {...state, orders: action.orders}
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
