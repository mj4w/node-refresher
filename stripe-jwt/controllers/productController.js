import Product from '../models/Product.js';
import isValidObjectId from '../helpers/validationObject.js'

const getAllProducts = async (req, res, next) => {
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;

        let products;

        if (qNew){
            products = await Product.find().sort({ createdAt: -1}).limit(5)
        } else if (qCategory){
            products = await Product.find({ 
                category: {
                    $in : [qCategory],
                } 
            })
        } else {
            products = await Product.find()
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const getProduct = async(req, res, next) => {
    try{
        const getProduct = await Product.findById(req.params.id);
        if (!getProduct) res.status(404).json("id not exist");
        res.status(200).json(getProduct);
    } catch (error) {
        res.status(404).json(error.message);
    }
}


const createProduct = async (req,res,next) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateProduct = async(req,res,next) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        if (!updateProduct) res.status(404).json('Product not found');
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteProduct = async(req,res,next) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete Product Successfully");
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,

}