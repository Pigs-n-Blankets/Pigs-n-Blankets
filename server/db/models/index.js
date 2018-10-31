const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Order = require('./orders')
const Review = require('./review')
const ProductOrder = require('./ProductOrder')

Category.belongsToMany(Product, {through: 'ProductCategory'})
Product.belongsToMany(Category, {through: 'ProductCategory'})
Order.belongsTo(User)
User.hasMany(Order)
Product.belongsToMany(Order, {through: ProductOrder})
Order.belongsToMany(Product, {through: ProductOrder})
User.hasMany(Review)
Review.belongsTo(User)
Product.hasMany(Review)
Review.belongsTo(Product)

module.exports = {
  User,
  Product,
  Category,
  Order,
  Review,
  ProductOrder
}
