import connectDB from './db/connect.js';
import Product from './models/product.js';
import dotenv from 'dotenv';

dotenv.config();

const start = async () => {
    try {
        const jsonProducts = await async('./products.json', {
            assert: {
                type: "json",
            }
        })
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
