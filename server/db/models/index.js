const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const Category = require('./category')

Category.belongsToMany(Product, {through: 'ProductCategory'})
Product.belongsToMany(Category, {through: 'ProductCategory'})

module.exports = {
  User,
  Product,
  Cart,
  Category
}
