const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  	rating: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.TEXT
    }
})

module.exports = Cart
