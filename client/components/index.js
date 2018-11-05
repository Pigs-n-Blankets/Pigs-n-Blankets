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
export {default as UpdateProduct} from './product/UpdateProduct'
export {default as SingleProductCard} from './product/SingleProductCard'
export {default as CartView} from './cart/CartView'
export {default as CartCard} from './cart/CartCard'
export {default as OrderHistory} from './user/OrderHistory'
export {default as Home} from './utils/Home'
export {default as ReviewForm} from './review/ReviewForm'
export {default as Dashboard} from './admin/Dashboard'
export {default as Orders} from './admin/Orders'
export {default as AllUsers} from './admin/AllUsers'
