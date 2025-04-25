import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { MongoClient } from 'mongodb';

const s3Client = new S3Client({region: process.env.AWS_REGION});
const bucketName = process.env.AWS_S3_BUCKET;
const mongoUri =  process.env.MONGO_URI;
const database = 'product-catalog';

// Create a MongoDB client
const dbClient = new MongoClient(mongoUri);

export const handler = async (event) => {
    try {   
        //open conection with mongoDb
        await connectToMongoDB();

        //processing records from event
        for (const record of event.Records) {
            console.log("Initilizing proccessing message ", record)
            
            //getting message content
            const rawBody = JSON.parse(record.body);
            const body = JSON.parse(rawBody.Message);
            const ownerId = body.ownerId;
            console.log("OwnerId: ", ownerId);
            
            // Fetch corresponding data from MongoDB
            const categories = await getCategoriesWithProducts(ownerId);
            console.log("Categories: ", categories);

            //stringfy catalog 
            const catalogJson = JSON.stringify(categories);
            //store JSON on bucket
            const filename = `${ownerId}-catalog.json`
            await putS3Object(bucketName, filename, catalogJson)
            
        }
        return { status: 'success' };
    } catch (err) {
        console.log("Error processing messages on SQS.", err);
        throw err;
    }
    finally{
        //close MongoDB connection
        dbClient.close();
    }


};

async function putS3Object(dstBucket, dstKey, content) {
    try {
        const putCommand = new PutObjectCommand({
            Bucket: dstBucket,
            Key: dstKey,
            Body: content,
            ContentType: "application/json"
        });

        const putResult = await s3Client.send(putCommand);

        return putResult;
    } catch (err) {
        console.log('Error storing object on AWS S3: ',err);
        throw err;
    }
}

// Connect database
async function connectToMongoDB() {
    try {
        console.log('Attempting to connect to MongoDB...');
        await dbClient.connect();
        console.log('Connected to MongoDB');

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

// Query categories by ownerId and populate with products
async function getCategoriesWithProducts(ownerId) {
    try {
        const db = dbClient.db(database);
        const catalogCollection = db.collection('categories');
        //const productCollection = db.collection('products');
    
        //Find all categories where ownerId equals provided value
        const query = { ownerId: ownerId };
    
        //const categories = await catalogCollection.find(query).toArray();
        const categories = await catalogCollection.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'category',
                    as: 'products'
                }
            }
        ]).toArray();
    
        return categories;
    } catch (err) {
        console.error('Error fetching categories: ', err);
        throw err;
    }
}