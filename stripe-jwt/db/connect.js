import mongoose from "mongoose";

const connectDB = (url) => {
    return mongoose.connect(url)
    .then(() => console.log('Database connection established!'))
    .catch((err) => {
        console.log(err)
    });
}

export default connectDB;