const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    ownerId: { type: String, default: uuidv4 },
});

const Product =  mongoose.model('Product', productSchema);

module.exports = Product;