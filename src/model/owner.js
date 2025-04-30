import mongoose from 'mongoose'

const OwnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

export const Owner = mongoose.model('Owner', OwnerSchema)