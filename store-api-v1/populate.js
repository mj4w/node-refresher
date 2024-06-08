import connectDB from './db/connect.js';
import Product from './models/product.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const start = async () => {
    try {
        const jsonProducts = JSON.parse(fs.readFileSync(path.resolve('products.json'), 'utf-8'));
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        
        console.log("Success");
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

start();
