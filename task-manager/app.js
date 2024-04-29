const express = require('express');
const tasks = require('./routes/task');
const app = express();
const connectDb = require('./db/connect')

// middleware
app.use(express.json())

app.use('/api/v1/tasks', tasks)


const port = 3000

const start = async () => {
    try {
        await connectDb();
        app.listen(port, console.log(`Serving on port ${port}`));
        console.log('Server is connected in MongoDb');
    } catch (err) {
        console.log(err);
    }
}

start()