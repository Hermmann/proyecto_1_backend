const productController = require('../controllers/product_controller')
const Router = require('express')
const routerProduct = Router()

routerProduct.post('/api/product/register', productController.createProduct);
routerProduct.get('/api/product', productController.getProductbyId);
routerProduct.get('/api/product/restaurant&categorie', productController.getProductbyRestaurantAndCategory);
routerProduct.put('/api/product/update', productController.updateProduct);
routerProduct.delete('/api/product/', productController.deleteProduct);

module.exports = routerProduct;