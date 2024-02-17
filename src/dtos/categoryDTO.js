class CreateCategoryDTO {
    constructor({ title, description, ownerId }) {
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
    }
}

class UpdateCategoryDTO extends CreateCategoryDTO {
    constructor({_id, ...args}) {
        super(args);
        this._id = _id;
    }
}

module.exports = {CreateCategoryDTO, UpdateCategoryDTO};
