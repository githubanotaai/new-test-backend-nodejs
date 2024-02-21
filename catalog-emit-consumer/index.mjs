import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { MongoClient } from 'mongodb';

const s3Client = S3Client({region: process.env.AWS_REGION})
const bucketName = process.env.AWS_S3_BUCKET;
const mongoUri = process.env.MONGO_URI;
const database = 'product-catalog';

// Create a MongoDB client
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect database
async function connectToMongoDB() {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    }
}

// Query catalogs by ownerId and populate with products
async function getCatalogsWithProducts(ownerId) {
    try {
        const db = client.db(database);
        const catalogCollection = db.collection('catalogs');
        const productCollection = db.collection('products');
    
        //Find all catalogs where ownerId equals provided value
        const query = { ownerId };
    
        const catalogs = await catalogCollection.find(query).toArray();
    
        // Populate each catalog with associated products
        for (const catalog of catalogs) {
            const products = await productCollection.find({ catalogId: catalog._id }).toArray();
            catalog.products = products;
        }
    
        return catalogs;
    } catch (err) {
        console.error('Error fetching catalogs: ', err);
        throw err;
    }
}

async function putS3Object(dstBucket, dstKey, content) {
    try {
        const putCommand = new PutObjectCommand({
            Bucket: dstBucket,
            Key: dstKey,
            Body: content,
            ContentType: "application/json"
        });

        const putResult = await client.send(putCommand);

        return putResult;
    } catch (err) {
        console.log('Error storing object on AWS S3: ',err);
        throw err;
    }
}

exports.handler = async (event) => {
    try {   
        //open conection with mongoDb
        await connectToMongoDB();


        //processing records from event
        for (const record of event.Records) {
            console.log("Initilizing proccessing message ", record)
            
            //getting message content
            const rawBody = JSON.parse(record.body);
            const body = JSON.parse(body.Message);
            const ownerId = body.ownerId;

            // Fetch corresponding data from MongoDB
            const catalogs = await getCatalogsWithProducts(ownerId);

            //stringfy catalog 
            const catalogsJson = JSON.stringify(catalogs)

            //store JSON on bucket
            const filename = `${ownerId}-catalog.json`
            await putS3Object(bucketName, filename, catalogsJson)
            
            
        }
        //close MongoDB connection
        client.close();
        return { status: 'success' };
    } catch (err) {
        console.log("Error processing messages on SQS.", err);
        throw err;
    }

}


