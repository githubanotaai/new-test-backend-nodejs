import {Model} from "mongoose";
import Category, {ICategory} from "../models/categoryModel";
import {CreateCategoryDTO, UpdateCategoryDTO} from "../dtos/categoryDTO";

class CategoryRepository {
  constructor(private model: Model<ICategory>) {}

  async create(categoryDTO: CreateCategoryDTO): Promise<ICategory> {
    const result = await this.model.create(categoryDTO);
    return result;
  }

  async find(): Promise<ICategory[] | null> {
    const result = await this.model.find().exec();
    return result;
  }

  async findById(id: string): Promise<ICategory | null> {
    const result = await this.model.findById(id).exec();
    return result;
  }

  async update(
    id: string,
    categoryDTO: UpdateCategoryDTO
  ): Promise<ICategory | null> {
    const result = await this.model
      .findByIdAndUpdate(id, categoryDTO, {new: true})
      .exec();
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id, {new: true}).exec();
  }
}

export default new CategoryRepository(Category);
