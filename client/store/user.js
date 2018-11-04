import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_USER = 'GET_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'

// INITIAL STATE
const defaultState = {
  currentUser: {},
  allUsers: []
}

// ACTION CREATORS
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getAllUsers = users => ({type: GET_ALL_USERS, users})

// THUNKS
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultState.currentUser))
  } catch (err) {
    console.error(err)
  }
}
export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}
export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}
export const updateMe = userData => async dispatch => {
  try {
    const user = await axios.put('/api/users', userData)
    dispatch(getUser(user.data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchUsers = () => async dispatch => {
  try {
    const { data: users } = await axios.get('/api/users')
    dispatch(getAllUsers(users))
  } catch (err) {
    console.error(err)
  }
}

// HANDLERS
const handler = {
  [GET_USER]: (state, action) => {
    return {...state, currentUser: action.user}
  },
  [GET_ALL_USERS]: (state, action) => {
    return {...state, allUsers: action.users}
  },
  [REMOVE_USER]: (state, action) => {
    return {...state, currentUser: {}}
  }
}

// REDUCER
export default function (state = defaultState, action) {
  if(!handler.hasOwnProperty(action.type)) {
    return state
  } else {
    return handler[action.type](state, action)
  }
}
// export default function(state = defaultUser, action) {
//   switch (action.type) {
//     case GET_USER:
//       return action.user
//     case REMOVE_USER:
//       return defaultUser
//     default:
//       return state
//   }
// }
