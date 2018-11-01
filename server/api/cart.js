const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

router.get('/:id/:idType', async (req, res, next) => {
  const id = req.params.id
  const idType = req.params.idType // userId or sessionId

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
