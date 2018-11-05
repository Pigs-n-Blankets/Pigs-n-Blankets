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
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  purchaseDate: {
    type: Sequelize.DATE
  }
})

module.exports = Order
