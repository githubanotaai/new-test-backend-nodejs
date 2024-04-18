import mongoose from "mongoose";
const Schema = mongoose.Schema

const categoriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owners: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Owner",
        
    }]
})

export const Categories = mongoose.model('Categories', categoriesSchema)