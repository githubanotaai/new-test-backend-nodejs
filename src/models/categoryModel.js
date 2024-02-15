const mongoose = require('mongoose');
//const { v4 : uuidv4 } = require('uuid');

const categorySchema = new mongoose.Schema({
    title: String,
    description: String, 
    ownerId: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;