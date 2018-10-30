const db = require('../db')
const Sequelize = require('sequelize')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'This product has no description'
  },
  rating: {
    type: Sequelize.INTEGER(5)
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.bristolgate.com/wp-content/uploads/2018/09/orionthemes-placeholder-image.png'
  },
  inventory: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
