import Product, {IProduct} from "../models/productModel";
import {CreateProductDTO, UpdateProductDTO} from "../dtos/productDTO";
import {Schema} from "mongoose";
import productRepository from "../repositories/productRepository";
import SNSService from "../aws/services/snsService";
import MessageDTO from "../aws/dtos/messageDTO";

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
  private snsService: SNSService;
  constructor() {
    const topic = process.env.AWS_SNS_TOPIC_CATALOG_ARN ?? "";
    this.snsService = new SNSService(topic);
  }

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
    // Multiply the price by 100 before saving
    productDTO.price = productDTO.price * 100;

    //save product
    const savedProduct = await productRepository.create(productDTO);
    //send message
    const msg = JSON.stringify({ownerId: savedProduct.ownerId});
    this.snsService.publish(new MessageDTO(msg));

    //Divide the price by 100 before returning
    return this.transformProduct(savedProduct);
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
    const updatedProduct = await productRepository.update(
      productId,
      updatedProductDTO
    );
    if (!updatedProduct) {
      return null;
    }
    // Send message
    const msg = JSON.stringify({ownerId: updatedProduct.ownerId});
    this.snsService.publish(new MessageDTO(msg));

    // Divide the price by 100 before returning
    return this.transformProduct(updatedProduct);
  }

  async deleteProduct(productId: string) {
    return await Product.findByIdAndDelete(productId);
  }
}

export default new ProductService();
