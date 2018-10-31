REST
RESTful

resources

/store/products
/store/products/1
/store/products/2

GET POST PUT DELETE

POST /products

url is the resouce
method is the action


router.post('/add-product', async (req, res, next) => {
router.delete('/add-product'
router.get('/add-product'

router.get('/productId/:productId', async (req, res, next) => {


GET/POST/PUT/DELETE
POST/GET /:bucket
GET POST PUT DELETE /:bucket/:id
GET /:bucket/:id/:sub-bucket

GET /products/productId/1
GET /products/productId
GET /products

GET /products/:id
GET /products/:category
    GET /category/:nameOrId/products
      typecheck on nameOrId
GET /products/:tag

GET /tags/:tag
GET /category/:category/products


GET /products?tag=fun


router.get('/', (req, res, next) => {
  if (req.params.tag)
})






