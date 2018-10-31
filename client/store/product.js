import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const GET_FILTERED_PRODUCTS = 'GET_FILTERED_PRODUCTS'
const GET_PRODUCT_CATEGORIES = 'GET_PRODUCT_CATEGORIES'

// INITIAL STATE
const defaultState = {
  allProducts: [],
  selectedProduct: {},
  categories: []
}

// ACTION CREATORS
const getProducts = products => ({type: GET_PRODUCTS, products})
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})
const addProduct = product => ({type: ADD_PRODUCT, product})
const updateProduct = product => ({type: UPDATE_PRODUCT, product})
const removeProduct = productId => ({type: DELETE_PRODUCT, productId})
const getFilteredProducts = products => ({
  type: GET_FILTERED_PRODUCTS,
  products
})
const getProductCategories = categories => ({
  type: GET_PRODUCT_CATEGORIES,
  categories
})

// THUNK CREATORS
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
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(getSingleProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const postProduct = product => async dispatch => {
  const {data} = await axios.post('/api/products/', product)
  dispatch(addProduct(data))
}
export const putProduct = (product, productId) => async dispatch => {
  const {data} = await axios.put(`/api/products/${productId}`, product)
  dispatch(updateProduct(data))
}

export const deleteProduct = productId => async dispatch => {
  await axios.delete(`/api/products/${productId}`)
  dispatch(removeProduct(productId))
}
export const fetchFilteredProducts = categoryName => async dispatch => {
  try {
    const route =
      categoryName === 'all' ? `api/products` : `/api/category/${categoryName}`
    const {data: products} = await axios.get(route)
    dispatch(getFilteredProducts(products))
  } catch (err) {
    console.error(err)
  }
}
export const fetchCategories = () => async dispatch => {
  const {data: categories} = await axios.get(`/api/category`)
  dispatch(getProductCategories(categories))
}

// HANDLERS
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
  },
  [GET_FILTERED_PRODUCTS]: (state, action) => {
    return {...state, allProducts: action.products}
  },
  [GET_PRODUCT_CATEGORIES]: (state, action) => {
    return {...state, categories: action.categories}
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
