import express from 'express'
import { ProductController } from '../controller/product-controller.js'

export const productRoute = express.Router()

const productsController = new ProductController()

productRoute
    .post('/', productsController.post)
    .get('/', productsController.get)
    .delete('/:id', productsController.remove)
    .put('/:id', productsController.update)
