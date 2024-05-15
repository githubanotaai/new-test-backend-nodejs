import { Products } from "../model/product.js"
import { Categories } from "../model/category.js"

export class ProductController {

    async post(req, res) {
        const { title, description, price, categoryId, ownerId } = req.body

        if(!title || !description || price <= 0 || !categoryId || !ownerId) {
            return res.status(400).json({
                message: 'Invalid labels empty'
            })
        }

        const checkIfProductExist = await Products.find({
            title
        })

        if(checkIfProductExist.length > 0) {
            return res.status(400).json({
                message: 'Product already exists!'
            })
        }

        const checkIfCategoryExists = await Categories.findById({
            '_id': categoryId,
            ownerId
        })

        if(!checkIfCategoryExists) {
            return res.status(400).json({
                message: 'Category or Owner not exists'
            })
        }

        const product = new Products({
            title,
            description,
            price,
            categoryId,
            ownerId
        })

        try {
            await product.save()

            return res.status(201).json(product)
        } catch(e) {
            return res.status(404).json({
                message: 'Server internal error'
            })

        }
    }

    async get(req, res) {

        try {
            const products = await Products.find()

            return res.status(201).json(products)
        } catch(e) {
            return res.status(404).json({
                message: 'Server internal error'
            })

        }
    }

    async remove(req, res) {
        const { id } = req.params

        try {
            await Products.findByIdAndDelete({
                '_id': id
            })

            return res.status(203).json({
                message: 'Owner deleted'
            })
        } catch(e) {
            return res.status(404).json({
                message: 'Server internal error'
            })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { title, description, price, categoryId, ownerId } = req.body

        const checkIfProductExist = await Products.findById({
            '_id': id
        })

        if(!checkIfProductExist) {
            return res.status(400).json({
                message: 'Product not exists!'
            })
        }

        try {
            await Products.findByIdAndUpdate(id, {
                title,
                description,
                price,
                categoryId,
                ownerId
            })

            return res.status(203).json({
                message: 'Product updated!'
            })
        } catch(e) {
            return res.status(500).json({
                message: 'Server internal Error'
            })
        }
    }
}