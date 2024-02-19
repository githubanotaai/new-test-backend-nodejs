import Product, {IProduct} from "../models/productModel";
import {CreateProductDTO, UpdateProductDTO} from "../dtos/productDTO";
import {Document, Schema} from "mongoose";

interface ProductDocument extends IProduct {}

interface transformProduct {
  _id: any;
  title: string;
  description: string;
  price: number;
  category: Schema.Types.ObjectId;
  ownerId: string;
}

class ProductService {
  private transformProduct(product: ProductDocument): transformProduct {
    return {
      _id: product._id,
      title: product.title,
      description: product.description,
      price: product.price / 100,
      category: product.category,
      ownerId: product.ownerId,
    };
  }

  async getAllProducts(): Promise<transformProduct[]> {
    const products = await Product.find();
    // Divide the price by 100 before returning
    return products.map(this.transformProduct);
  }

  async getProduct(productId: string): Promise<transformProduct | null> {
    const product = await Product.findById(productId);
    if (!product) {
      return null;
    }
    return this.transformProduct(product);
  }

  async createProduct(productDTO: CreateProductDTO): Promise<transformProduct> {
    const product = new Product({
      title: productDTO.title,
      description: productDTO.description,
      price: productDTO.price * 100,
    });
    const productSaved = await product.save();
    return this.transformProduct(productSaved);
  }

  async updateProduct(
    productId: string,
    productDTO: UpdateProductDTO
  ): Promise<transformProduct | null> {
    // Multiply the price by 100 before updating
    const updatedProductDTO = {
      ...productDTO,
      price: productDTO.price * 100,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductDTO,
      {new: true}
    );
    if (!updatedProduct) {
      return null;
    }
    // Divide the price by 100 before returning
    return this.transformProduct(updatedProduct);
  }

  async deleteProduct(productId: string) {
    return await Product.findByIdAndDelete(productId);
  }
}

export default new ProductService();
