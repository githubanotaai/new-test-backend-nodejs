import { Categories } from "../model/category.js";
import { Owner } from "../model/owner.js";
import { Products } from "../model/product.js";

export class CatalogController {

    async get(req, res) {
        const { ownerId } = req.params

       try {
            const owner = await Owner.findById({
                '_id': ownerId
            })
            
            const product = await Products.find({
                'ownerId': owner.id
            })

            const category = await Categories.findOne({
                'ownerId': owner.id
            })


            const ownerCatalog = {
                owner: owner.name,
                catalog: [{
                    categoryTitle: category.title,
                    categoryDescription: category.description,
                    itens: product.map(({title, description, price}) => {
                        return {
                            title,
                            description,
                            price
                        }
                    }) 
                }]
            }
            return res.status(200).json(ownerCatalog)
       } catch(e) {
            return res.status(500).json({
                message: 'Server Internal Error'
            })
       }
    }
}