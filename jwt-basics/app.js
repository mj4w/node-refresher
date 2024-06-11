import express from 'express'
import { notFound } from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import environment from './env.js';

const app = express();

// middleware
app.use(express.static('./public')) // fronted lives here
app.use(express.json())


// url not found 
app.use(notFound)
app.use(errorHandlerMiddleware)


async function start(){
    const port = environment.port || 3000
    try {
        // await connectDB(environment.mongo_uri);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error)
    }
}
start()