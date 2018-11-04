const router = require('express').Router()
const {Order, Product, User} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403)
    return next(new Error('Access denied'))
  }
  next()
}

router.get('/admin', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          User
        }
      ]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
