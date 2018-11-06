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
  },
  orderId: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

// INSTANCE METHOD: increment orderID
Order.prototype.incrementOrderId = function () {
  this.orderId += 1;
}

module.exports = Order
