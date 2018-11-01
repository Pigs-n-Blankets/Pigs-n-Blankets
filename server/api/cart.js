const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  let id
  let idType
  if (req.user) {
    id = req.user.dataValues.id
    idType = 'userId'
  } else {
    id = req.session.id
    idType = 'sessionId'
  }

  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product
        }
      ],
      where: {
        [idType]: id,
        orderStatus: 'inCart'
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  let id
  let idType
  if (req.user) {
    id = req.user.dataValues.id
    idType = 'userId'
  } else {
    id = req.session.id
    idType = 'sessionId'
  }
  const price = req.body.price
  const quantity = req.body.quantity
  const subtotal = quantity * price
  const product = req.body.product
  const myOrder = {
    [idType]: id,
    orderStatus: 'inCart',
    price: price,
    quantity: quantity,
    subtotal: subtotal
  }
  try {
    const order = await Order.create(myOrder)
    await order.setProduct(product)
    res.json(order)
  } catch (err) {
    next(err)
  }
})
