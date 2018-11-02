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
  // needs req.body to be {quantity, productId}
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
    const product = await Product.findById(req.body.productId)
    console.log(product)
    const price = product.price
    const quantity = req.body.quantity
    const subtotal = quantity * price

    const myOrder = {
      [idType]: id,
      orderStatus: 'inCart',
      price: price,
      quantity: quantity,
      subtotal: subtotal
    }
    const order = await Order.create(myOrder)
    await order.setProduct(product)
    res.json(order)
  } catch (err) {
    next(err)
  }
})
