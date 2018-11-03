import axios from 'axios'

// ACTION TYPES
const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

// INITIAL STATE
const defaultState = []

// ACTION CREATORS
const getReviews = reviews => ({type: GET_REVIEWS, reviews})
const addReview = review => ({type: ADD_REVIEW, review})

// THUNK CREATORS
export const fetchReviews = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/reviews/${productId}`)
    console.log('REVIEWS', res.data)
    dispatch(getReviews(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const postReview = (productId, newReview) => async dispatch => {
  try {
    const {data: review} = await axios.post(`/api/reviews/${productId}`, newReview)
    dispatch(addReview(review))
  } catch (err) {
    console.error(err)
  }
}

// HANDLERS
const handler = {
  [GET_REVIEWS]: (state, action) => {
    return action.reviews
  },
  [ADD_REVIEW]: (state, action) => {
    return [...state, action.review]
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
