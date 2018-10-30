const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  subtotal: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.00
  },
  orderStatus: {
    type: Sequelize.ENUM,
    values: ['created', 'processing', 'cancelled', 'completed']
  }
})

module.exports = Order;
