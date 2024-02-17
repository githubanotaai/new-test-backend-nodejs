const Router = require('express').Router;
const categoryController = require('../controllers/categoryController');

const router = Router();
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:categoryId', categoryController.getCategory);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:categoryId', categoryController.updateCategory);
router.delete('/categories/:categoryId', categoryController.deleteCategory);

module.exports = router;
