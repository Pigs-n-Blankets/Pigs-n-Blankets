'use strict'

const db = require('../server/db')
const {User, Product, Category, Review} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const products = await Promise.all([
    Product.create({
      name: 'Doggy Snowman',
      price: 10.99,
      description: 'dress your dog up as a snowman this holiday season!',
      rating: 4.7,
      imgUrl:
        'https://www.rover.com/blog/wp-content/uploads/2017/12/snowmandog.jpg'
    }),
    Product.create({
      name: 'Dapper Pup',
      price: 7.95,
      description: 'have the most dapper pup with this puppy tuxedo!',
      rating: 3.4,
      imgUrl:
        'https://image.dhgate.com/0x0/f2/albu/g4/M00/81/F0/rBVaEFds4Z-AaBqjAAams5cUse8326.jpg'
    }),
    Product.create({
      name: 'Super Cat',
      price: 14.75,
      description: 'We all know cats are the SUPERior species',
      rating: 4.9,
      imgUrl:
        'http://cutecatsinhats.com/wp-content/uploads/2016/03/Gaorui-Puppy-lovely-Superman-Pet-Dog-Clothes-Halloween-apparel-Costumes-Cute-Jumpsuit-0-1024x1024.jpg'
    }),
    Product.create({
      name: 'Sassy Kitty',
      price: 13.99,
      rating: 2.3,
      imgUrl:
        'https://ae01.alicdn.com/kf/HTB1xAzFNpXXXXbMXpXXq6xXFXXX9/Pet-Supplies-Cat-Clothes-Cats-Wear-Pet-Coats-Hoopet-Clothing-For-Domestic-Cats-Blouse-Jackets-Dogs.jpg'
    }),
    Product.create({
      name: 'Cowboy Piglet',
      price: 17.8,
      rating: 5,
      description: 'I mean, how can you resist...?',
      imgUrl:
        'http://thefw.com/files/2012/09/tumblr_m0edolFcz51rr5f7co1_500-e1348601887820.jpg?w=630&h=630&q=75'
    }),
    Product.create({
      name: 'Piglet Booties',
      price: 24.95,
      rating: 2.7,
      description: 'keep your piglets hooves dry in its pen',
      imgUrl:
        'http://slummysinglemummy.files.wordpress.com/2012/03/pig-in-wellies.jpg'
    }),
    Product.create({
      name: 'Identity Crisis',
      price: 24.95,
      rating: 2.7,
      description:
        'Do you have a pig who thinks he is a unicorn? This is the perfect compromise',
      imgUrl:
        'https://i.dailymail.co.uk/i/pix/2014/09/26/1411729138384_Image_galleryImage_PIC_FROM_CATERS_NEWS_PICT.JPG'
    }),
    Category.create({name: 'dogs'}),
    Category.create({name: 'cats'}),
    Category.create({name: 'pigs'}),
    Category.create({name: 'horses'}),
    Review.create({
      rating: 3,
      description: 'its alright'
    }),
    Review.create({rating: 2, description: 'its bad'}),
    Review.create({
      rating: 4,
      description: 'its nice now'
    }),
    User.create({
      firstName: 'Cody',
      lastName: 'TheDog',
      email: 'cody@email.com',
      address: 'Doghouse Chicago, IL',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'TheDog',
      email: 'murphy@email.com',
      address: 'Doghouse Chicago, IL',
      password: '123'
    })
  ]).then(
    ([
      doggySnowman,
      dapperPup,
      superCat,
      sassyKitty,
      cowboyPiglet,
      pigletBooties,
      identityCrisis,
      dogs,
      cats,
      pigs,
      horses,
      review1,
      review2,
      review3,
      cody,
      murphy
    ]) => {
      return Promise.all([
        doggySnowman.setCategories(dogs),
        dapperPup.setCategories(dogs),
        superCat.setCategories(cats),
        sassyKitty.setCategories(cats),
        cowboyPiglet.setCategories(pigs),
        pigletBooties.setCategories(pigs),
        identityCrisis.setCategories(pigs),
        review1.setUser(cody),
        review1.setProduct(doggySnowman),
        review2.setUser(murphy),
        review2.setProduct(doggySnowman),
        review3.setUser(cody),
        review3.setProduct(dapperPup)
      ])
    }
  )
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
