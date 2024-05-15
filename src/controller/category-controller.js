import { Categories } from "../model/category.js";
import { Owner } from "../model/owner.js";

export class CategoryController {

    async post(req, res) {
        const { title, description, ownerId } = req.body

        const checkIfCategoryExist = await Categories.find({
            title
        })

        if(checkIfCategoryExist.length > 0) {
            return res.status(400).json({
                message: 'Category already exists!'
            })
        }

        if(!ownerId || !title || !description) return res.status(201).json({
            message: 'Empty labels invalid'
        })

        const checkIfOwnerExists = await Owner.findById({
            '_id': ownerId
        })

        if(!checkIfOwnerExists) {
            return res.status(400).json({
                message: 'Owner not exists!'
            })
        }

        const categories = new Categories({
            title,
            description,
            ownerId
        })

        try {
            await categories.save()

            return res.status(201).json(categories)
        }catch(e) {
            
            return res.status(201).json({
                message: 'Server Internal Error'
            })
        }
    }

    async get(req, res) {
       try {
            const categories = await Categories.find()

            return res.status(200).json(categories)
       } catch(e) {
            return res.status(200).json({
                message: 'Server Internal Error'
            })
       }
    }
    
    async remove(req, res) {
        const { id } = req.params
        
        try {
           await Categories.findByIdAndDelete({
                '_id': id
            })

            return res.status(203).json({
                message: 'Category deleted'
            })
        } catch(e) {
            return res.status(500).json({
                message: 'Server internal error'
            })

        }
    }

    async update(req, res) {
        const { id } = req.params
        const { title, description, ownerId } = req.body

        const checkIfCategoryExist = await Categories.findById({
            '_id': id
        })

        if(!checkIfCategoryExist) {
            return res.status(400).json({
                message: 'Category not exists'
            })
        }

        try {
            await Categories.findByIdAndUpdate(id, {
                title,
                description,
                ownerId
            })

            return res.status(203).json({
                message: 'Categorie updated'
            })
        } catch(e) {
            return res.status(203).json({
                message: 'Server internal Error'
            })

        }


    }
}