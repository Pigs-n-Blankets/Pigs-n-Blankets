const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    console.error(err)
  }
})

router.get('/:categoryName', async (req, res, next) => {
  const categoryName = req.params.categoryName
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          through: {
            attributes: ['categoryId', 'productId']
          },
          where: {
            name: categoryName
          }
        }
      ]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})
