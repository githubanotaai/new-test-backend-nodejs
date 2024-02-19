const Router = require('express').Router;
const productController = require('../controllers/productController');

const router = Router();
router.get('/products', productController.getAllProducts);
router.get('/products/:productId', productController.getProduct);
router.post('/products', productController.createProduct);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
