import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a Name'],
        trim: true,
        maxlength: [20, 'Names must not exceed 20 characters']
    }
})