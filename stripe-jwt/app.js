import express from 'express';
import morgan from 'morgan';
import environment from './env.js';
import connectDB from './db/connect.js';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import productRoute from './routes/product.js';
import cartRoute from './routes/cart.js';
import orderRoute from './routes/order.js'
import stripeRoute from './routes/stripe.js'
// import logger from './middleware/logger.js';
import cors from 'cors'
 
const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json())
app.use(cors());
// test routes
app.get('/', (req, res) => {
    console.log('Hello World');
})

// routes
app.use('/api/users/', userRoute);
app.use('/api/auth/', authRoute);
app.use('/api/product/', productRoute);
app.use('/api/cart/', cartRoute);
app.use('/api/order/', orderRoute);
app.use('/api/checkout/', stripeRoute);

// app.use((err, req, res, next) => {
//     logger.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

async function start(){
    const port = environment.port || 3000
    try {
        await connectDB(environment.mongo_uri);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error)
    }
}
start()