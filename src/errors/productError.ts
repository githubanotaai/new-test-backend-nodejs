export class ProductNotFoundError extends Error {
  constructor(message: string = "Product not found") {
    super(message);
    this.name = this.constructor.name;
  }
}
