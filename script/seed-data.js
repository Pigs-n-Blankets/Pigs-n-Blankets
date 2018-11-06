const categoryData = [
  {name: 'dogs'},
  {name: 'cats'},
  {name: 'pigs'},
  {name: 'horses'},
  {name: 'guinea pigs'},
  {name: 'birds'},
  {name: 'bunnies'},
  {name: 'turtles'}
]

const productData = [
  {
    name: 'Doggy Snowman',
    price: 10.99,
    description: 'dress your dog up as a snowman this holiday season!',
    rating: 4.7,
    imgUrl:
      'https://www.rover.com/blog/wp-content/uploads/2017/12/snowmandog.jpg',
    inventory: 10
  },
  {
    name: 'Dapper Pup',
    price: 7.95,
    description: 'have the most dapper pup with this puppy tuxedo!',
    rating: 3.4,
    imgUrl:
      'https://image.dhgate.com/0x0/f2/albu/g4/M00/81/F0/rBVaEFds4Z-AaBqjAAams5cUse8326.jpg',
    inventory: 10
  },
  {
    name: 'Super Cat',
    price: 14.75,
    description: 'We all know cats are the SUPERior species',
    rating: 4.9,
    imgUrl:
      'http://cutecatsinhats.com/wp-content/uploads/2016/03/Gaorui-Puppy-lovely-Superman-Pet-Dog-Clothes-Halloween-apparel-Costumes-Cute-Jumpsuit-0-1024x1024.jpg',
    inventory: 10
  },
  {
    name: 'Sassy Kitty',
    price: 13.99,
    rating: 2.3,
    imgUrl:
      'https://ae01.alicdn.com/kf/HTB1xAzFNpXXXXbMXpXXq6xXFXXX9/Pet-Supplies-Cat-Clothes-Cats-Wear-Pet-Coats-Hoopet-Clothing-For-Domestic-Cats-Blouse-Jackets-Dogs.jpg',
    inventory: 10
  },
  {
    name: 'Cowboy Piglet',
    price: 17.8,
    rating: 5,
    description: 'I mean, how can you resist...?',
    imgUrl:
      'http://thefw.com/files/2012/09/tumblr_m0edolFcz51rr5f7co1_500-e1348601887820.jpg?w=630&h=630&q=75',
    inventory: 10
  },
  {
    name: 'Piglet Booties',
    price: 24.95,
    rating: 2.7,
    description: 'keep your piglets hooves dry in its pen',
    imgUrl:
      'http://slummysinglemummy.files.wordpress.com/2012/03/pig-in-wellies.jpg',
    inventory: 10
  },
  {
    name: 'Pumpkin',
    price: 9.95,
    rating: 1.3,
    description:
      'For when your guinea pig feels left out during pumpkin spice latte season',
    imgUrl:
      'https://i.pinimg.com/originals/bd/c7/43/bdc74309e7aa9b91e860d0e4585b43f3.jpg',
    inventory: 10
  },
  {
    name: "It's a Fiesta!",
    price: 19.99,
    rating: 3.5,
    description:
      'want a hat...what about a hat with fruit, or one with red pom poms? This is your one-stop-shop!',
    imgUrl:
      'https://lakewood.advocatemag.com/wp-content/uploads/2012/02/164.jpg',
    inventory: 10
  },
  {
    name: "Teacher's Pet",
    price: 14.95,
    rating: 4,
    description: 'Keep your turtle warm this winter season',
    imgUrl:
      'https://s-i.huffpost.com/gadgets/slideshows/326347/slide_326347_3139345_free.jpg',
    inventory: 10
  },
  {
    name: 'Which Witch!?',
    price: 12.49,
    rating: 2.3,
    imgUrl:
      'https://mms.businesswire.com/media/20130905005372/en/381196/5/Guinea_Pig_Witch_Costume.jpg?download=1',
    inventory: 10
  },
  {
    name: 'Guinea Up!',
    price: 29.95,
    rating: 5,
    description: 'ride into the wild west with this number',
    imgUrl:
      'https://i.dailymail.co.uk/i/pix/2016/01/14/11/302852A100000578-0-image-a-56_1452772150655.jpg',
    inventory: 10
  },
  {
    name: 'Identity Crisis',
    price: 24.95,
    rating: 2.7,
    description:
      'Do you have a pig who thinks he is a unicorn? This is the perfect compromise',
    imgUrl:
      'https://i.dailymail.co.uk/i/pix/2014/09/26/1411729138384_Image_galleryImage_PIC_FROM_CATERS_NEWS_PICT.JPG',
    inventory: 10
  },
  {
    name: 'Super Bunny',
    price: 10.38,
    rating: 4.1,
    description: "It's a bird, it's a plane, it's superbunny!!",
    imgUrl: 'https://i.ytimg.com/vi/oy1UjKiXlQA/maxresdefault.jpg',
    inventory: 10
  },
  {
    name: 'Rocker Chick',
    price: 8.75,
    rating: 4.4,
    description: 'Feel the beat',
    imgUrl: 'http://www.freakingnews.com/pictures/11000/Punk-Parrot--11484.jpg',
    inventory: 10
  },
  {
    name: 'Sea Horse',
    price: 31.25,
    rating: 3.9,
    description: 'Put on that scuba gear and head to the beach!',
    imgUrl:
      'https://www.queencreek.org/Home/ShowImage?id=13309&t=636106594413600000',
    inventory: 10
  }
]

const userData = [
  {
    firstName: 'user',
    lastName: 'user',
    email: 'user@user.com',
    address: '415 W Erie St. chicago, IL',
    isAdmin: false,
    password:
      '189a54153c10f2cc925f20a7de251a7cd5ba45010fb6a51c6eabdb0072ef3499',
    salt: 'jXo5hEtiF/v8D4WtkAW2gg==',
    imageUrl:
      'http://dy5jipgyozh6.cloudfront.net/wp-content/uploads/2017/01/03212027/dogs-liking-people.jpg'
  },
  {
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com',
    address: '415 W Superior St. chicago, IL',
    isAdmin: true,
    password:
      '6a1bddc659db6a92893e8de82bf0617b923f9bc7b20ae38c15d5f74c7badee57',
    salt: 'uTV7+Lrpnkz3SBQq8YsPJg==',
    imageUrl:
      'https://www.usnews.com/dims4/USNEWS/31a9441/2147483647/thumbnail/970x647/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2Fdc%2F81%2F792744d24cb3a89642c491d9507b%2F160525-goldenretriever-stock.jpg'
  },
  {
    firstName: 'Sarah',
    lastName: 'Doe',
    email: 'sarahDoe@email.com',
    address: '848 Somerset Avenue Saint Albans, NY 11412',
    isAdmin: false,
    password: '123',
    imageUrl:
      'https://i.dailymail.co.uk/i/pix/2016/04/21/17/0058BD5300000258-0-image-a-2_1461257354380.jpg'
  },
  {
    firstName: 'Marci',
    lastName: 'Attridge',
    email: 'marci@email.com',
    address: '49 Johnson Street Chardon, OH 44024',
    isAdmin: false,
    password: '123',
    imageUrl:
      'https://trudog.com/wp-content/uploads/2017/12/shutterstock_511107457.jpg'
  },
  {
    firstName: 'Scott',
    lastName: 'Klebenow',
    email: 'scott@email.com',
    address: '342 Cedar Swamp Dr. Wheaton, IL 60187',
    isAdmin: false,
    password: '123',
    imageUrl:
      'https://barkpost.com/wp-content/uploads/2015/05/old-dog-with-a-old-man.jpg'
  },
  {
    firstName: 'Finn',
    lastName: 'Terdal',
    email: 'finn@email.com',
    address: '65 Hamilton St. Daphne, AL 36526',
    isAdmin: false,
    password:
      'ba1556e4734542d41e8104a4cb1930f6aff6ba949e3284df97cfb356328cd63d',
    salt: 'zaKPoqKsGJv6u58tR0J33Q==',
    imageUrl:
      'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/cat_people_vs_dog_people_slideshow/photolibrary_rm_photo_of_older_man_with_cat.jpg'
  },
  {
    firstName: 'Jimmy',
    lastName: 'Johnson',
    email: 'jimmy@email.com',
    address: '77 Mill Pond Street Hobart, IN 46342',
    isAdmin: false,
    password: '123',
    imageUrl:
      'https://cdn.images.express.co.uk/img/dynamic/130/590x/secondary/Cheating-wife-husband-1027750.jpg'
  },
  {
    firstName: 'Katherine',
    lastName: 'Pearson',
    email: 'kat@email.com',
    address: '8419 Hillcrest St. Greenfield, IN 46140',
    isAdmin: false,
    password: '123',
    imageUrl:
      'http://donoteatpigs.org/wp-content/uploads/2017/05/Teacup-Pigs-in-Arkansas.jpg'
  },
  {
    firstName: 'Billy',
    lastName: 'Bob',
    email: 'billybob@email.com',
    address: '333 Maiden Drive Ambler, PA 19002',
    isAdmin: false,
    password: '123',
    imageUrl:
      'https://www.irishtimes.com/polopoly_fs/1.2573791.1458044443!/image/image.jpg_gen/derivatives/box_620_330/image.jpg'
  }
]

const orderData = [
  {
    orderStatus: 'inCart'
  },
  {
    orderStatus: 'inCart'
  },
  {
    orderStatus: 'inCart'
  },
  {
    orderStatus: 'created',
    purchaseDate: '2018-10-2',
    orderId: 6
  },
  {
    orderStatus: 'created',
    purchaseDate: '2018-10-2',
    orderId: 6
  },
  {
    orderStatus: 'created',
    purchaseDate: '2018-10-2',
    orderId: 6
  },
  {
    orderStatus: 'created',
    purchaseDate: '2018-9-21',
    orderId: 5
  },
  {
    orderStatus: 'created',
    purchaseDate: '2018-9-21',
    orderId: 5
  },
  {
    orderStatus: 'processing',
    purchaseDate: '2018-8-30',
    orderId: 4
  },
  {
    orderStatus: 'processing',
    purchaseDate: '2018-8-30',
    orderId: 4
  },
  {
    orderStatus: 'processing',
    purchaseDate: '2018-8-30',
    orderId: 4
  },
  {
    orderStatus: 'processing',
    purchaseDate: '2018-9-2',
    orderId: 3
  },
  {
    orderStatus: 'completed',
    purchaseDate: '2018-1-2',
    orderId: 2
  },
  {
    orderStatus: 'completed',
    purchaseDate: '2018-1-12',
    orderId: 2
  },
  {
    orderStatus: 'completed',
    purchaseDate: '2018-1-12',
    orderId: 2
  },
  {
    orderStatus: 'completed',
    purchaseDate: '2018-4-22',
    orderId: 1
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
  }
]

module.exports = {
  productData,
  userData,
  reviewData,
  categoryData,
  orderData
}
