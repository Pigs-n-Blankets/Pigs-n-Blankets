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
      order: [['userId', 'DESC']]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/admin/:filterCriteria', isAdmin, async (req, res, next) => {

  const filterCriteria = req.params.filterCriteria
  console.log('NUMBER CONVERSION --->', Number(filterCriteria))
  const modelCol = Number(filterCriteria) ? 'userId':'orderStatus'
  const orderCol = Number(filterCriteria) ? 'userId':'purchaseDate'


  // const orderStatus = req.params.orderStatus
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          User
        }
      ],
      where: {
        [modelCol]: filterCriteria
      },
      order: [[orderCol, 'DESC']]
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


