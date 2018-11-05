const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

const idFinder = req => {
  let id
  let idType
  if (req.user) {
    id = req.user.dataValues.id
    idType = 'userId'
  } else {
    id = req.session.id
    idType = 'sessionId'
  }
  return {id, idType}
}

router.get('/', async (req, res, next) => {
  const {id, idType} = idFinder(req)
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

// ORDER HISTORY ROUTE
router.get('/:userId', async (req, res, next) => {
  const userId = req.params.userId
  const Op = Sequelize.Op
  try {
    const orderHistory = await Order.findAll({
      include: [
        {
          model: Product
        }
      ],
      where: {
        userId: userId,
        orderStatus: {
          [Op.or]: ['created', 'processing', 'cancelled', 'completed']
        }
      },
      order: [['purchaseDate', 'DESC']]
    })
    res.json(orderHistory)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  // needs req.body to be {quantity, productId}
  const {id, idType} = idFinder(req)
  try {
    const product = await Product.findById(req.body.productId)
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

router.delete('/', async (req, res, next) => {
  const {id, idType} = idFinder(req)

  try {
    await Order.destroy({
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
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  const {id, idType} = idFinder(req)

  try {
    const productId = req.params.productId
    await Order.destroy({
      include: [
        {
          model: Product
        }
      ],
      where: {
        [idType]: id,
        orderStatus: 'inCart',
        productId: productId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  const userId = req.user.dataValues.id
  const sessionId = req.session.id

  const myOrder = {
    userId: userId
  }
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product
        }
      ],
      where: {
        sessionId: sessionId,
        orderStatus: 'inCart'
      }
    })
    Promise.all(
      orders.forEach(order => {
        order.update(myOrder)
      })
    )
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/quantity/:productId', async (req, res, next) => {
  // req.body = {quantity}
  try {
    const {id, idType} = idFinder(req)
    const productId = req.params.productId
    const order = await Order.findAll({
      where: {
        [idType]: id,
        orderStatus: 'inCart',
        productId: productId
      }
    })
    const myOrder = {
      quantity: Number(req.body.quantity) + Number(order[0].quantity)
    }
    await order[0].update(myOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/quantity/update/:orderId', async (req, res, next) => {
  // req.body = {quantity}
  try {
    const order = await Order.findById(req.params.orderId)
    await order.update(req.body)
  } catch (err) {
    next(err)
  }
})
