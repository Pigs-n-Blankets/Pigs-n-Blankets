import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_USER = 'GET_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'
const ADMIN_REMOVE_USER = 'ADMIN_REMOVE_USER'
const ADMIN_UPDATE_USER = 'ADMIN_UPDATE_USER'

// INITIAL STATE
const defaultState = {
  currentUser: {},
  allUsers: []
}

// ACTION CREATORS
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const adminRemoveUser = userId => ({type: ADMIN_REMOVE_USER, userId})
const adminUpdateUser = updatedUser => ({type: ADMIN_UPDATE_USER, updatedUser})

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
export const deleteUser = (userId) => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    dispatch(adminRemoveUser(userId))
  } catch (err) {
    console.error(err)
  }
}
export const putUser = (userId, updatedUserBody) => async dispatch => {
  try {
    console.log('userId', userId);
    console.log('updated body', updatedUserBody)
    const {data: updatedUser} = await axios.put(`/api/users/${userId}`, updatedUserBody)
    console.log('UPDATED USER', updatedUser)
    dispatch(adminUpdateUser(updatedUser))
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
  },
  [ADMIN_REMOVE_USER]: (state, action) => {
    const updatedUsers = state.allUsers.filter((user) => user.id !== action.userId)
    return {...state, allUsers: updatedUsers}
  },
  [ADMIN_UPDATE_USER]: (state, action) => {
    const updatedUsers = state.allUsers.map((user) => {
      if (user.id === action.updatedUser.id) {
        user = action.updatedUser
      }
      return user
    })
    return {...state, allUsers: updatedUsers}
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
