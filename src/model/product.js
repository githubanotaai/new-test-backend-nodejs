import mongoose, { Schema, SchemaTypes } from "mongoose";

const productSchema = new Schema({
    title: {
        type: SchemaTypes.String,
        required: true
    }, 
    description: {
        type: SchemaTypes.String,
        required: true
    }, 
    price: {
        type: SchemaTypes.Number,
        required: true
    }, 
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Categories", 
    }, 
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Owner",
    }
})

export const Products = mongoose.model('Products', productSchema)