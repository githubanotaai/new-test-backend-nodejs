import { Owner } from "../model/owner.js"

export class OwnerController {

    async post(req, res) {
        const { name } = req.body

        const owners = new Owner({
            name
        })

        await owners.save()

        return res.status(201).json(owners)
    }

    async getAll(req, res) {
        const owners = await Owner.find()

        return res.status(200).json(owners)
    }
}