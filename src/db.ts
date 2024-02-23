import mongoose, { Connection } from 'mongoose';

const { MONGO_URI } = process.env;

export default async function connect(): Promise<Connection> {
    const db = mongoose.connection;
    
    db.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });
    db.once('open', () => {
        console.log('MongoDb connected');
    });

    await mongoose.connect(MONGO_URI!, {});
    
    return db;
};
