import mongoose from "mongoose";


const connectDb = (url) => {
    return mongoose.connect(url)
    .then(() => {
        console.log("Connection established")
    })
    .catch((err) => {
        console.log(err.message)
    })
}

export default connectDb;