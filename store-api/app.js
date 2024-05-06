import express from "express"
import notFound from "./middleware/notFound"
import errorMiddleware from "./middleware/errorHandler"
import { port } from "./env"
import asyncErrors from "express-async-errors"
require("dotenv").config()
import connectDB from "./db/connect"
import mongoUri from "./settings/mongo.config"

const app = express()
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

// router
import product from "./routes/product"
app.use('/api/v1/products/',product)


app.use(notFound)
app.use(errorMiddleware)

async function start() {
    try {
        await connectDB(mongoUri);
        app.listen(port).on('listening', () => {
            console.log(`Running Server on port ${port}`)
        })
        console.log('Connected successfully to MongoDB');
    } catch (error) {
        
    }
}

start();

export default app;