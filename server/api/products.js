const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

//mounted on /products

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category
        }
      ]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/add-product', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/productId/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId, {
      include: [
        {
          model: Category
        }
      ]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/productId/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId
    await Product.update(req.body, {
      where: {
        id
      }
    })
    const product = await Product.findById(id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/productId/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.get('/categories', async(req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    console.error(err)
  }
})

router.get('/category/:categoryName', async(req, res, next) => {
  const categoryName = req.params.categoryName;
  try {
    const products = await Product.findAll({
      include: [{
          model: Category,
          through: {
            attributes: ['categoryId', 'productId']
          },
          where: {
            name: categoryName
          }
        }]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})
