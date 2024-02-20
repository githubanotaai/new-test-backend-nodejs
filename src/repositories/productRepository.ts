import {Model} from "mongoose";
import Product, {IProduct} from "../models/productModel";
import {CreateProductDTO, UpdateProductDTO} from "../dtos/productDTO";

class ProductRepository {
  constructor(private model: Model<IProduct>) {}

  async create(productDTO: CreateProductDTO): Promise<IProduct> {
    const result = await this.model.create(productDTO);
    return result;
  }

  async find(): Promise<IProduct[] | null> {
    const result = await this.model.find().exec();
    return result;
  }

  async findById(id: string): Promise<IProduct | null> {
    const result = await this.model.findById(id).exec();
    return result;
  }

  async update(
    id: string,
    productDTO: UpdateProductDTO
  ): Promise<IProduct | null> {
    const result = await this.model
      .findByIdAndUpdate(id, productDTO, {new: true})
      .exec();
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id, {new: true}).exec();
  }
}

export default new ProductRepository(Product);
