/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './utils/navbar'
export {default as UserHome} from './user/user-home'
export {Login, Signup} from './user/auth-form'
export {default as UserAccount} from './user/UserAccount'
export {default as AllProducts} from './product/AllProducts'
export {default as SingleProduct} from './product/SingleProduct'
export {default as AddProduct} from './product/AddProduct'
