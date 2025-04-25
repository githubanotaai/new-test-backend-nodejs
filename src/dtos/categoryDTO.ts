export class CreateCategoryDTO {
    title: string;
    description: string;
    ownerId: string;

    constructor({ title, description, ownerId } : { title: string; description: string; ownerId: string; }) 
    {
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
    }
}

export class UpdateCategoryDTO extends CreateCategoryDTO {
    _id: string

    constructor({_id, ...args}: { _id: string; title: string; description: string; ownerId: string; }) {
        super(args);
        this._id = _id;
    }
}
