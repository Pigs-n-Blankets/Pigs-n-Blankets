const router = require('express').Router()
const {Review, User, Product} = require('../db/models')
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

router.post('/:productId', async (req, res, next) => {
  const productId = req.params.productId
  const {rating, description} = req.body
  const userId = req.user.dataValues.id

  try {
    const newReviewBody = {rating, description}
    const newReview = await Review.create(newReviewBody)
    await newReview.setUser(userId)
    await newReview.setProduct(productId)
    const reviewWithUser = await Review.findOne({
      where: {
        id: newReview.id
      },
      include: [
        {
          model: User
        },
        {
          model: Product
        }
      ]
    })
    const allReviews = await Review.findAll({
      where: {
        productId: reviewWithUser.productId
      }
    })

    let reviewSum = 0

    allReviews.forEach(review => {
      reviewSum += review.rating
    })

    const newRating = Number((reviewSum / allReviews.length).toFixed(2))
    await reviewWithUser.product.update({rating: newRating})

    res.json(reviewWithUser)
  } catch (err) {
    next(err)
  }
})
