import express from 'express'
import { OwnerController } from '../controller/onwer-controller.js'

export const ownersRoute = express.Router()

const ownerController = new OwnerController()

ownersRoute
    .get('/', ownerController.get)
    .post('/', ownerController.post)
    .delete('/:id', ownerController.remove)
    