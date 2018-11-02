const productData = [
  {
    name: 'Doggy Snowman',
    price: 10.99,
    description: 'dress your dog up as a snowman this holiday season!',
    rating: 4.7,
    imgUrl:
      'https://www.rover.com/blog/wp-content/uploads/2017/12/snowmandog.jpg'
  },
  {
    name: 'Dapper Pup',
    price: 7.95,
    description: 'have the most dapper pup with this puppy tuxedo!',
    rating: 3.4,
    imgUrl:
      'https://image.dhgate.com/0x0/f2/albu/g4/M00/81/F0/rBVaEFds4Z-AaBqjAAams5cUse8326.jpg'
  },
  {
    name: 'Super Cat',
    price: 14.75,
    description: 'We all know cats are the SUPERior species',
    rating: 4.9,
    imgUrl:
      'http://cutecatsinhats.com/wp-content/uploads/2016/03/Gaorui-Puppy-lovely-Superman-Pet-Dog-Clothes-Halloween-apparel-Costumes-Cute-Jumpsuit-0-1024x1024.jpg'
  },
  {
    name: 'Sassy Kitty',
    price: 13.99,
    rating: 2.3,
    imgUrl:
      'https://ae01.alicdn.com/kf/HTB1xAzFNpXXXXbMXpXXq6xXFXXX9/Pet-Supplies-Cat-Clothes-Cats-Wear-Pet-Coats-Hoopet-Clothing-For-Domestic-Cats-Blouse-Jackets-Dogs.jpg'
  },
  {
    name: 'Cowboy Piglet',
    price: 17.8,
    rating: 5,
    description: 'I mean, how can you resist...?',
    imgUrl:
      'http://thefw.com/files/2012/09/tumblr_m0edolFcz51rr5f7co1_500-e1348601887820.jpg?w=630&h=630&q=75'
  },
  {
    name: 'Piglet Booties',
    price: 24.95,
    rating: 2.7,
    description: 'keep your piglets hooves dry in its pen',
    imgUrl:
      'http://slummysinglemummy.files.wordpress.com/2012/03/pig-in-wellies.jpg'
  },
  {
    name: 'Identity Crisis',
    price: 24.95,
    rating: 2.7,
    description:
      'Do you have a pig who thinks he is a unicorn? This is the perfect compromise',
    imgUrl:
      'https://i.dailymail.co.uk/i/pix/2014/09/26/1411729138384_Image_galleryImage_PIC_FROM_CATERS_NEWS_PICT.JPG'
  },
]

const userData = [
  {
    firstName: "user",
    lastName: "user",
    email: "user@user.com",
    address: '415 W Erie St. chicago, IL',
    isAdmin: false,
    password: 'user',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjeZOs1OzbCzaKqkL2H5azjxc5PkIMP0ylrqpm8nJVwGBgH-C7'
  },
  {
    firstName: "admin",
    lastName: "admin",
    email: "admin@admin.com",
    address: '415 W Superior St. chicago, IL',
    isAdmin: true,
    password: 'admin',
    imageUrl: 'https://www.usnews.com/dims4/USNEWS/31a9441/2147483647/thumbnail/970x647/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2Fdc%2F81%2F792744d24cb3a89642c491d9507b%2F160525-goldenretriever-stock.jpg'
  },
  {
    firstName: "Sarah",
    lastName: "Doe",
    email: "sarahDoe@email.com",
    address: "848 Somerset Avenue Saint Albans, NY 11412",
    isAdmin: false,
    password: '123',
    imageUrl: 'https://i.dailymail.co.uk/i/pix/2016/04/21/17/0058BD5300000258-0-image-a-2_1461257354380.jpg'
  },
  {
    firstName: "Marci",
    lastName: "Attridge",
    email: "marci@email.com",
    address: "49 Johnson Street Chardon, OH 44024",
    isAdmin: false,
    password: '123',
    imageUrl: 'https://trudog.com/wp-content/uploads/2017/12/shutterstock_511107457.jpg'
  },
  {
    firstName: "Scott",
    lastName: "Klebenow",
    email: "scott@email.com",
    address: "342 Cedar Swamp Dr. Wheaton, IL 60187",
    isAdmin: false,
    password: '123',
    imageUrl: 'https://barkpost.com/wp-content/uploads/2015/05/old-dog-with-a-old-man.jpg'
  },
  {
    firstName: "Finn",
    lastName: "Terdal",
    email: "finn@email.com",
    address: "65 Hamilton St. Daphne, AL 36526",
    isAdmin: false,
    password: '123',
    imageUrl: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/cat_people_vs_dog_people_slideshow/photolibrary_rm_photo_of_older_man_with_cat.jpg'
  },
  {
    firstName: "Jimmy",
    lastName: "Johnson",
    email: "jimmy@email.com",
    address: "77 Mill Pond Street Hobart, IN 46342",
    isAdmin: false,
    password: '123',
    imageUrl: 'https://cdn.images.express.co.uk/img/dynamic/130/590x/secondary/Cheating-wife-husband-1027750.jpg'
  },
  {
    firstName: "Katherine",
    lastName: "Pearson",
    email: "kat@email.com",
    address: "8419 Hillcrest St. Greenfield, IN 46140",
    isAdmin: false,
    password: '123',
    imageUrl: 'http://donoteatpigs.org/wp-content/uploads/2017/05/Teacup-Pigs-in-Arkansas.jpg'
  },
  {
    firstName: "Billy",
    lastName: "Bob",
    email: "billybob@email.com",
    address: "333 Maiden Drive Ambler, PA 19002",
    isAdmin: false,
    password: '123',
    imageUrl: 'https://www.irishtimes.com/polopoly_fs/1.2573791.1458044443!/image/image.jpg_gen/derivatives/box_620_330/image.jpg'
  }
]


const orderData = [
  {
    orderStatus: 'inCart',
  },
  {
    orderStatus: 'created',
  }

]

const reviewData = [
  {
    rating: 3,
    description: 'its alright'
  },
  {
    rating: 2,
    description: 'its bad'
  },
  {
    rating: 4,
    description: 'its nice now'
  },
  {
    rating: 1,
    description: 'its really really bad'
  },
  {
    rating: 2.5,
    description: 'its ehh'
  },
  {
    rating: 5,
    description: 'wow!'
  },
]

const categoryData = [
  {name: 'dogs'},
  {name: 'cats'},
  {name: 'pigs'},
  {name: 'horses'},
]


module.exports = {
  productData,
  userData,
  reviewData,
  categoryData,
  orderData,
};
