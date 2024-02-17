const Category = require('../models/categoryModel');


class CategoryService {
    async getAllCategories ( ) {
        return await Category.find();
    }
    
    async getCategory(categoryId) {
        return await Category.findById(categoryId);
    }

    async createCategory( categoryDTO ) {
        const category = new Category (categoryDTO);
        return await category.save()
    };

    async updateCategory (categoryId, categoryDTO) {
        return await Category.findByIdAndUpdate( categoryId, categoryDTO, {new: true});
    }

    async deleteCategory(categoryId) {
        return await Category.findByIdAndDelete(categoryId);
    }
}

//module.exports = CategoryService;
module.exports = new CategoryService();
