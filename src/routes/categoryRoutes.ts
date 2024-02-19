import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';

const router = Router();
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:categoryId', categoryController.getCategory);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:categoryId', categoryController.updateCategory);
router.delete('/categories/:categoryId', categoryController.deleteCategory);

export default router;