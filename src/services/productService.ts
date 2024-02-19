const Product = require('../models/productModel');


class ProductService {
    async getAllProducts() {
        const products = await Product.find();
        // Divide the price by 100 before returning
        return products.map(product => ({
            ...product._doc,
            price: product.price / 100
        }));
    }

    async getProduct (productId) {
        return await Product.findById(productId);
    }

    async createProduct(productDTO) {
        const product = new Product({
            title: productDTO.title,
            description: productDTO.description,
            price: productDTO.price * 100,

        });
        //return await product.save();
        const productSaved =  await product.save()
        return {
            ...productSaved._doc,
            price: productSaved.price / 100
        };
    }

    async updateProduct(productId, productDTO) {
        // Multiply the price by 100 before updating
        const updatedProductDTO = {
            ...productDTO,
            price: productDTO.price * 100,
        }

        const updatedProduct = await Product.findByIdAndUpdate();

        // Divide the price by 100 before returning
        return {
        ...updatedProduct._doc,
        price: updatedProduct.price / 100
    };
    }

    async deleteProduct(productId) {
        return await Product.findByIdAndDelete(productId);
    }
}

module.exports = new  ProductService();

