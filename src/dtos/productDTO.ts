export class CreateProductDTO {
  title: string;
  description: string;
  price: number;
  categoryId: string;
  ownerId: string;

  constructor({
    title,
    description,
    price,
    categoryId,
    ownerId,
  }: {
    title: string;
    description: string;
    price: number;
    categoryId: string;
    ownerId: string;
  }) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.categoryId = categoryId;
    this.ownerId = ownerId;
  }
}

export class UpdateProductDTO extends CreateProductDTO {
  _id: string;

  constructor({
    _id,
    ...args
  }: {
    _id: string;
    title: string;
    description: string;
    price: number;
    categoryId: string;
    ownerId: string;
  }) {
    super(args);
    this._id = _id;
  }
}
