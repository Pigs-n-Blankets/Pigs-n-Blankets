'use strict'

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
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.INTEGER(5)
  },
  imgUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Product
