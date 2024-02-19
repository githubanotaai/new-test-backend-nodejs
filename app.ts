require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';

import productRoutes from './src/routes/productRoutes';
import categoryRoutes from './src/routes/categoryRoutes';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
