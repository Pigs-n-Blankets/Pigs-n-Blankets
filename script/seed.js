'use strict'

const db = require('../server/db')
const {
  productData,
  userData,
  reviewData,
  categoryData,
  orderData
} = require('./seed-data')

const {User, Product, Category, Review, Order} = require('../server/db/models')

function shuffle(array) {
  var m = array.length,
    t,
    i
  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const productPromise = Product.bulkCreate(productData, {returning: true})
  const userPromise = User.bulkCreate(userData, {returning: true})
  const reviewPromise = Review.bulkCreate(reviewData, {returning: true})
  const orderPromise = Order.bulkCreate(orderData, {return: true})
  const categoryPromise = Category.bulkCreate(categoryData, {returning: true})

  await Promise.all([
    productPromise,
    userPromise,
    reviewPromise,
    categoryPromise,
    orderPromise
  ])

  await db.sync()

  const products = await Product.findAll()
  const categories = await Category.findAll()
  const users = await User.findAll()
  const reviews = await Review.findAll()
  const orders = await Order.findAll()

  async function seedReviews() {
    for (let i = 0; i < reviews.length; i++) {
      const randomUser = shuffle(users)[0]
      const randomProduct = shuffle(products)[0]
      await reviews[i].setUser(randomUser)
      await reviews[i].setProduct(randomProduct)
    }
    return reviews
  }
  await seedReviews()

  async function seedOrders() {
    for (let i = 0; i < orders.length; i++) {
      if (i <= orders.length / 2) {
        const defaultUser = users.filter(user => user.firstName === 'user')[0]
        let productsCopy = [...products]
        const randomProduct = shuffle(productsCopy)[0]
        await orders[i].setUser(defaultUser)
        await orders[i].setProduct(randomProduct)
        await orders[i].update({price: randomProduct.price})
        productsCopy = productsCopy.filter(product => product !== randomProduct)
      } else {
        const randomProduct = shuffle(products)[0]
        const randomUser = shuffle(users)[0]
        await orders[i].setUser(randomUser)
        await orders[i].setProduct(randomProduct)
        await orders[i].update({price: randomProduct.price})
      }
    }
    return orders
  }
  await seedOrders()

  async function seedCategories() {
    const dogs = products.filter(product =>
      ['Doggy Snowman', 'Dapper Pup', "It's a Fiesta!"].includes(product.name)
    )

    const cats = products.filter(product =>
      ['Super Cat', 'Sassy Kitty', "It's a Fiesta!"].includes(product.name)
    )

    const pigs = products.filter(product =>
      ['Cowboy Piglet', 'Piglet Booties', 'Identity Crisis'].includes(
        product.name
      )
    )

    const horses = products.filter(product =>
      ['Sea Horse'].includes(product.name)
    )

    const guineaPigs = products.filter(product =>
      ['Pumpkin', 'Which Witch!?', 'Guinea Up!'].includes(product.name)
    )

    const birds = products.filter(product =>
      ['Rocker Chick'].includes(product.name)
    )

    const bunnies = products.filter(product =>
      ['Super Bunny'].includes(product.name)
    )

    const turtles = products.filter(product =>
      ["Teacher's Pet"].includes(product.name)
    )

    for (let i = 0; i < dogs.length; i++) {
      await dogs[i].setCategories(categories[0])
    }
    for (let i = 0; i < cats.length; i++) {
      await cats[i].setCategories(categories[1])
    }
    for (let i = 0; i < pigs.length; i++) {
      await pigs[i].setCategories(categories[2])
    }
    for (let i = 0; i < horses.length; i++) {
      await horses[i].setCategories(categories[3])
    }
    for (let i = 0; i < guineaPigs.length; i++) {
      await guineaPigs[i].setCategories(categories[4])
    }
    for (let i = 0; i < birds.length; i++) {
      await birds[i].setCategories(categories[5])
    }
    for (let i = 0; i < bunnies.length; i++) {
      await bunnies[i].setCategories(categories[6])
    }
    for (let i = 0; i < turtles.length; i++) {
      await turtles[i].setCategories(categories[7])
    }
  }
  await seedCategories()

  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
