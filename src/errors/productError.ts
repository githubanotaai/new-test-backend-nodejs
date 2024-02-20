export class CategoryNotFoundError extends Error {
  constructor(message: string = "Category not found or owner not match") {
    super(message);
    this.name = this.constructor.name;
  }
}
