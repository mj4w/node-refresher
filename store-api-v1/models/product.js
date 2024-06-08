import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a Name'],
        trim: true,
        maxlength: [20, 'Names must not exceed 20 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        enum: {
            values: ['ikea','liddy','caressa','marcos'],
            message: '{VALUE} is not supported',
        },
    },
})


export default mongoose.model('Product',productSchema)

