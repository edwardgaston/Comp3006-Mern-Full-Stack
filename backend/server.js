import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();
connectDB(); // Ensure the database is connected before handling requests

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

app.post('/api/products', async (req, res) => { // Ensure the route path starts with a '/'
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creating product", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(5000, () => {
    console.log('Server started at http://localhost:5000');
});