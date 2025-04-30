
import { Owner } from "../model/owner.js"

export class OwnerController {

    async post(req, res) {
        const { name } = req.body

        if(!name || name.length < 3) {
            return res.status(400).json({
                message: 'O campo deve conter mais que 3 caracteres'
            })
        }

        const owners = new Owner({
            name
        })

        try {
            await owners.save()


            return res.status(201).json(owners)
        }catch(e) {

            return res.status(404).json({
                message: 'Server internal Error'
            })
        }
    }

    async get(req, res) {
        const owners = await Owner.find()

        return res.status(200).json(owners)
    }

    async remove(req, res) {
        const { id } = req.params

        try {
            await Owner.findByIdAndDelete({
                '_id': id
            })

            return res.status(203).json({
                message: 'Owner deleted'
            })
        } catch(e) {
            return res.status(500).json({
                message: 'Server internal Error'
            })

        }
    }
}