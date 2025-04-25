import CategoryRepository from "../repositories/categoryRepository";
import {CreateCategoryDTO, UpdateCategoryDTO} from "../dtos/categoryDTO";

class CategoryService {
  constructor(private categoryRepository: typeof CategoryRepository) {}

  async getAllCategories() {
    return await this.categoryRepository.find();
  }

  async getCategory(categoryId: string) {
    return await this.categoryRepository.findById(categoryId);
  }

  async createCategory(categoryDTO: CreateCategoryDTO) {
    return await this.categoryRepository.create(categoryDTO);
  }

  async updateCategory(categoryId: string, categoryDTO: UpdateCategoryDTO) {
    return await this.categoryRepository.update(categoryId, categoryDTO);
  }

  async deleteCategory(categoryId: string) {
    return await this.categoryRepository.delete(categoryId);
  }
}

export default new CategoryService(CategoryRepository);
