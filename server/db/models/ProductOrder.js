const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productOrder', {
  multiplier: {
    type: Sequelize.INTEGER
  }
})

module.exports = ProductOrder
