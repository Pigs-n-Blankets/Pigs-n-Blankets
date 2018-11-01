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
