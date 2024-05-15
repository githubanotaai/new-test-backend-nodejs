import express from 'express'
import { CategoryController } from '../controller/category-controller.js'

export const categoriesRoute = express.Router()

const categoryController = new CategoryController()

categoriesRoute
    .get('/', categoryController.get)
    .post('/', categoryController.post)
    .delete('/:id', categoryController.remove)
    .put('/:id', categoryController.update)
    