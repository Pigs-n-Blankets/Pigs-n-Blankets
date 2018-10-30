const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const Category = require('./category')
const Order = require('./orders')
const Review = require('./review')

Category.belongsToMany(Product, {through: 'ProductCategory'})
Product.belongsToMany(Category, {through: 'ProductCategory'})
Order.belongsTo(User)
User.hasMany(Order)
User.hasMany(Review)
Review.belongsTo(User)
Product.hasMany(Review)
Review.belongsTo(Product)
Cart.belongsTo(User)
Product.hasMany(Cart)

module.exports = {
  User,
  Product,
  Cart,
  Category,
  Order,
  Review
}
