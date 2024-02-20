import {Model} from "mongoose";
import Product, {IProduct} from "../models/productModel";
import Category, {ICategory} from "../models/categoryModel";
import {CreateProductDTO, UpdateProductDTO} from "../dtos/productDTO";
import {CategoryNotFoundError} from "../errors/categoryError";
import {ProductNotFoundError} from "../errors/productError";

class ProductRepository {
  constructor(
    private model: Model<IProduct>,
    private categoryModel: Model<ICategory>
  ) {}

  private async mapProduct(productDTO: CreateProductDTO | UpdateProductDTO) {
    const category = await this.categoryModel
      .findOne({
        _id: productDTO.categoryId,
        ownerId: productDTO.ownerId,
      })
      .orFail(
        () =>
          new CategoryNotFoundError(
            `The Category '${productDTO.categoryId}' provided does not exist or the category owner does not match the product owner.`
          )
      )
      .exec();
    const product = new Product({
      ...productDTO,
      category: category,
    });

    return product;
  }

  async create(productDTO: CreateProductDTO): Promise<IProduct> {
    const product = await this.mapProduct(productDTO);
    const result = await this.model.create(product);
    return result;
  }

  async find(): Promise<IProduct[] | null> {
    const result = await this.model.find().populate("category").exec();
    return result;
  }

  async findById(id: string): Promise<IProduct | null> {
    const result = await this.model.findById(id).populate("category").exec();
    return result;
  }

  async update(
    id: string,
    productDTO: UpdateProductDTO
  ): Promise<IProduct | null> {
    const product = await this.mapProduct(productDTO);
    const result = await this.model
      .findByIdAndUpdate(id, product, {new: true})
      .orFail(() => new ProductNotFoundError("Product not found"))
      .populate("category")
      .exec();
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id, {new: true}).exec();
  }
}

export default new ProductRepository(Product, Category);
