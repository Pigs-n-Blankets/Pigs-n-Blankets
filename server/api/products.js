const router = require('express').Router()
const {Product, Category} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403)
    return next(new Error('Access denied'))
  }
  next()
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

router.get('/search/:search', async (req, res, next) => {
  const Op = Sequelize.Op
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category
        }
      ],
      where: {
        name: {[Op.iLike]: `%${req.params.search}%`}
      }
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

router.put('/quantity/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId
    const product = await Product.findById(id, {
      include: [
        {
          model: Category
        }
      ]
    })
    const inventory = {inventory: product.inventory - req.body.quantity}
    await Product.update(inventory, {
      where: {
        id
      }
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const productId = req.params.productId
    const updatedProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      rating: req.body.rating,
      imgUrl: req.body.imgUrl,
      inventory: req.body.inventory
    }
    await Product.update(updatedProduct, {
      where: {
        id: productId
      }
    })
    const product = await Product.findById(productId, {
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
