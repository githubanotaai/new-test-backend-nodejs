class CreateProductDTO {
    constructor({ title, description, price, categoryId, ownerId }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.ownerId = ownerId;
    }
}

class UpdateProductDTO extends CreateProductDTO {
    constructor({_id, ...args}){
        super(args);
        this._id = _id;
    };
}

module.exports = { CreateProductDTO, UpdateProductDTO };