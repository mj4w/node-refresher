import Cart from '../models/Cart.js'
import isValidObjectId from '../helpers/validationObject.js'

const createCart = async (req, res, next) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);    
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateCart = async (req,res,next) => {
    try {
        const updateCart = await Cart.findById(req.params.id,{
            $set: req.body
        }, { new: true});
        if (!updateCart) res.status(404).json('Cart not found');
        res.status(200).json(updateCart);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteCart  = async (req,res,next) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const deleteCart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteCart);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne(req.params.id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getAllCart = async (req, res, next) => {
    try {
        const getAllCart = await Cart.find();
        res.status(200).json(getAllCart);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export {
    createCart,
    updateCart,
    deleteCart,
    getCart,
    getAllCart,


}