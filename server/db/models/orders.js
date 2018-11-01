const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  subtotal: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.0
  },
  orderStatus: {
    type: Sequelize.ENUM,
    values: ['inCart', 'created', 'processing', 'cancelled', 'completed']
  },
  sessionId: {
    type: Sequelize.STRING
  }
})

module.exports = Order
