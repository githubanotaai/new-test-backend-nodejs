import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import connect from './db';

//import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

//app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

connect().then( () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
