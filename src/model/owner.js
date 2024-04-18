import mongoose from 'mongoose'

const OwnerSchema = new mongoose.Schema({
    name: String
})

export const Owner = mongoose.model('Owner', OwnerSchema)