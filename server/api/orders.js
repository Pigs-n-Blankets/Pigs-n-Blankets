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
      ],
      order: [['purchaseDate', 'DESC']]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/admin/:orderStatus', isAdmin, async (req, res, next) => {
  const orderStatus = req.params.orderStatus
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          User
        }
      ],
      where: {
        orderStatus: orderStatus
      },
      order: [['purchaseDate', 'DESC']]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/admin/:orderId', isAdmin, async (req, res, next) => {
  //req.body = {orderStaus: orderStatus}
  try {
    const order = await Order.findById(req.params.orderId, {
      include: [
        {
          model: Product,
          User
        }
      ]
    })
    await order.update(req.body)
    res.json(order)
  } catch (err) {
    next(err)
  }
})
