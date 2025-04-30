import express from 'express'
import { CatalogController } from '../controller/catalog-controller.js'

export const catalogRoute = express.Router()

const catalogController = new CatalogController()

catalogRoute
    .get('/:ownerId', catalogController.get)