const router = require('express').Router()
const {Review, User} = require('../db/models')
module.exports = router

router.get('/:productId', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        productId: req.params.productId
      },
      include: [
        {
          model: User
        }
      ]
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})
