require('dotenv').config();
const express = require('express');
const mongoose = require('./db');

const Product = require('./src/models/productModel');


const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Route to register a product
app.post('/products', async (req, res) => {
    try{
        const { title, description, price, category, ownerId } = req.body;
        const product = new Product({
            title,
            description,
            price,
            category,
            owner: ownerId,
        });  
        
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
