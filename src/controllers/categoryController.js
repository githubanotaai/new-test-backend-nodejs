const Category = require('../models/categoryModel');


const createCategory = async (req, res) => {
    try{
        const { title, description, ownerId } = req.body; 
        const category = new Category({
            title,
            description,
            ownerId,
        });    

        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}`});
    }
};

const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; 
        const { title, description, ownerId } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            {title, description, ownerId }, 
            {new: true }
        );

        if (!updateCategory) {
            return res.status(404).json({ error: 'Category not found'});
        }

        res.json(updatedCategory);
    } catch {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}`});
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; 
        const { title, description, ownerId } = req.body;

        const updatedCategory = await Category.findByIdAndDelete(
            categoryId,
            {title, description, ownerId }, 
            {new: true }
        );

        if (!updateCategory) {
            return res.status(404).json({ error: 'Category not found'});
        }

        res.json({message: 'Category deleted successfully'});
    } catch {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}`});
    }
};




module.exports = {
    createCategory
};