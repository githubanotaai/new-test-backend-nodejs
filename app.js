require('dotenv').config();
const express = require('express');
const mongoose = require('./db');
const bodyParser = require('body-parser');

const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
