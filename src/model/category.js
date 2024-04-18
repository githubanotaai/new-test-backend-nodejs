import mongoose from "mongoose";
const Schema = mongoose.Schema

const categoriesSchema = new Schema({
    title: String,
    description: String,
    owners: [{
        type: Schema.Types.ObjectId,
        ref: "Owner"
    }]
})

export const Categories = mongoose.model('Categories', categoriesSchema)