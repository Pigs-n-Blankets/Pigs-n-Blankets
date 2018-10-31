import axios from 'axios'

// ACTION TYPES
const GET_REVIEWS = 'GET_REVIEWS'

// INITIAL STATE
const defaultState = []

// ACTION CREATORS
const getReviews = reviews => ({type: GET_REVIEWS, reviews})

// THUNK CREATORS
export const fetchReviews = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/reviews/${productId}`)
    dispatch(getReviews(res.data))
  } catch (err) {
    console.error(err)
  }
}

// HANDLERS
const handler = {
  [GET_REVIEWS]: (state, action) => {
    return action.reviews
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
