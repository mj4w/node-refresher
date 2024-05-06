const express = require('express');
const tasks = require('./routes/task');
const app = express();
const connectDb = require('./db/connect')
require('dotenv').config()

const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// middleware
app.use(express.json())

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, console.log(`Serving on port ${port}`));
        console.log('Server is connected in MongoDb');
    } catch (err) {
        console.log(err);
    }
}

start()