import { Router } from 'express'
import { CategoryController } from '../controller/category-controller.js'

export const categoriesRoute = Router()

const categoryController = new CategoryController()

categoriesRoute
    .get('/', categoryController.getAll)
    .post('/', categoryController.post)
    