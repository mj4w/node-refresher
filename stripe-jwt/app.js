import express from 'express';
import morgan from 'morgan';
import environment from './env.js';
import connectDB from './db/connect.js';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import productRoute from './routes/product.js';
// import logger from './middleware/logger.js';
 
const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json())

// test routes
app.get('/', (req, res) => {
    console.log('Hello World');
})

// routes
app.use('/api/users/', userRoute);
app.use('/api/auth/', authRoute);
app.use('/api/product/', productRoute);

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