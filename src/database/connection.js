import mongoose from "mongoose"

const user = process.env.MONGO_USERNAME
const pass = process.env.MONGO_PASSWORD

export class MongoConnectDatabase {

    async main() {
        await mongoose.connect(`mongodb://localhost:27017/db`, {
            authSource: 'admin',
            user,
            pass,
        })
    }
}

    
