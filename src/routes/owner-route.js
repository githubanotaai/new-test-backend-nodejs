import { Router } from 'express'
import { OwnerController } from '../controller/onwer-controller.js'

export const ownersRoute = Router()

const ownerController = new OwnerController()

ownersRoute
    .get('/', ownerController.getAll)
    .post('/', ownerController.post)
    