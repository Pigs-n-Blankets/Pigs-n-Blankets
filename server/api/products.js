const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403)
    return next(new Error('Access denied'))
  }
}

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

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
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

router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const id = req.params.productId
    await Product.update(req.body, {
      where: {
        id
      }
    })
    const product = await Product.findById(id, {
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

router.delete('/:productId', isAdmin, async (req, res, next) => {
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
