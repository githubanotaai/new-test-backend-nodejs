const { CreateCategoryDTO, UpdateCategoryDTO } = require('../dtos/categoryDTO');
const categoryService = require('../services/categoryService'); 

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}`});
    }
}

const getCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; 
        const category = await categoryService.getCategory(categoryId);
        if (!updateCategory) {
            return res.status(404).json({ error: 'Category not found'});
        }
        res.status(200).json(category);
    } catch {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}`});
    }
}

const createCategory = async (req, res) => {
    try {
        const categoryDTO = new CreateCategoryDTO( req.body ); 

        const savedCategory = await categoryService.createCategory(categoryDTO);

        res.status(201).json(savedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}`});
    }
};

const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; 

        if (!req.body) {
            return res.status(400).json({ error: 'Request body is missing' });
        }
        
        const categoryDTO = new UpdateCategoryDTO(req.body);

        if ( categoryId !== categoryDTO._id ) {
            return res.status(400).json({ 
                error: 'id doesnt match. ',
                _id: categoryDTO._id,
                categoryId: categoryId,
            });
        }

        const updatedCategory = await categoryService.updateCategory(categoryId, categoryDTO)

        if (!updateCategory) {
            return res.status(404).json({ error: 'Category not found'});
        }

        res.json(updatedCategory);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}`});
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; 

        const message = await categoryService.deleteCategory(categoryId);
       
        if (!message) {
            return res.status(400).json({ success: false, error: 'Message not found!' })
        }
        return res.status(200).json({ success: true, data: message, })


    } catch {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error - ${error}`});
    }
};

module.exports = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};