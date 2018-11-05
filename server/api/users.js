const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'address',
        'imageUrl',
        'isAdmin'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.dataValues.id)
    const updatedUser = await user.update(req.body)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const { isAdmin } = req.body
    const userToUpdate = await User.findById(userId)
    const updatedUser = await userToUpdate.update({isAdmin})
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    await User.destroy({
      where: {
        id: userId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
