import Category from '../models/categoryModel';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/categoryDTO';

class CategoryService {
    async getAllCategories () {
        return await Category.find();
    }
    
    async getCategory(categoryId: string) {
        return await Category.findById(categoryId);
    }

    async createCategory( categoryDTO: CreateCategoryDTO) {
        const category = new Category (categoryDTO);
        return await category.save()
    };

    async updateCategory (categoryId: string, categoryDTO: UpdateCategoryDTO) {
        return await Category.findByIdAndUpdate( categoryId, categoryDTO, {new: true});
    }

    async deleteCategory(categoryId: string,) {
        return await Category.findByIdAndDelete(categoryId);
    }
}

export default new CategoryService();
