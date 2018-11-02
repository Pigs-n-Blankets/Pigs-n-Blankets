const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  let id
  let idType;
  if (req.user) {
    id = req.user.dataValues.id
    idType = 'userId'
  } else {
    id = req.session.id
    idType = 'sessionId'
  }

  try {
      const orders = await Order.findAll({
        include: [{
          model: Product
        }],
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


router.delete('/:productId', async (req, res, next) => {
  let id
  let idType;
  if (req.user) {
    id = req.user.dataValues.id
    idType = 'userId'
  } else {
    id = req.session.id
    idType = 'sessionId'
  }

  try {
    const productId = req.params.productId
    await Order.destroy({
      include: [{
        model: Product
      }],
      where: {
        [idType]: id,
        orderStatus: 'inCart',
        productId: productId
      }
    })
    res.status(204).end();
  } catch (err) {
    next(err)
  }
})
