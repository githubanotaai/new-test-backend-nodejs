import { Categories } from "../model/category.js";

export class CategoryController {

    async post(req, res) {
        const { title, description, owners } = req.body

        if(!owners) return res.status(201).json({
            message: 'Owner id is required'
        })

        const categories = new Categories({
            title,
            description,
            owners
        })

        try {
            await categories.save()

            return res.status(201).json(categories)
        }catch(e) {
            
            return res.status(201).json({
                message: 'Fields required'
            })
        }
    }

    async getAll(req, res) {
        const categories = await Categories.find()

        return res.status(200).json(categories)
    }
}