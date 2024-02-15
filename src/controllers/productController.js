const Product = require('../models/productModel');




const createProduct =  async (req, res) => {
    try{
                const { title, description, price, category, ownerId } = req.body;
                const product = new Product({
                    title,
                    description,
                    price,
                    category,
                    ownerId,
                });  
                
                const savedProduct = await product.save();
                res.status(201).json(savedProduct);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: `Internal Server Error - ${error}` });
            }
};



module.exports = {
    createProduct
};