const { CreateProductDTO , UpdateProductDTO } = require('../dtos/productDTO');
const Product = require('../models/productModel');
const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}`})
    }
}

const getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await productService.getProduct(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}`});
    }
}


const createProduct =  async (req, res) => {
    try{
        const productDTO = new CreateProductDTO( req.body );
                        
        const savedProduct = await productService.createProduct(productDTO);
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}` });
    }
};

const updateProduct = async (req, res) => {
    try {
        
        const { productId } = req.params;

        const productDTO  = new UpdateProductDTO ( req.body );

        if ( productId !== productDTO._id ) {
            return res.status(400).json({ 
                error: 'id doesnt match. ',
                _id: productDTO._id,
                productId: productId,
            });
        
        }
        const updatedProduct = await productService.updateProduct(productDTO);

        if(!updateProduct) {
            return res.status(404).json({error: 'Product not found'});
        }

        res.json(updatedProduct)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}`});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params;

        const message = await productService.deleteProduct(productId);

        if (!message) {
            return res.status(400).json({ success: false, error: 'Message not found!' })
        }
        return res.status(200).json({ success: true, data: message, })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}`});
    }
};

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};