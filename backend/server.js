import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import productRoutes from './routes/product.route.js';

dotenv.config();
connectDB(); // Ensure the database is connected before handling requests

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/api/products", productRoutes);

app.listen(5000, () => {
    console.log('Server started at http://localhost:5000');
});