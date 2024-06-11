import isValidObjectId from '../helpers/validationObject.js';
import Order from '../models/Order.js'

const createOrder = async (req, res, next) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error.message);        
    }
}

const updateOrder = async (req, res, next) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true})
        if (!updateOrder) res.status(404).json('Order not found')
        res.status(200).json(updateOrder)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteOrder = async (req,res,next) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            res.status(404).json('Order not found')
        }
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getOrder = async (req, res, next) => {
    try {
        const getOrder = await Order.find(req.params.id)
        res.status(200).json(getOrder)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getAllOrder = async (req, res, next) => {
    try {
        const getAllOrder = await Order.find()
        res.status(200).json(getAllOrder)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getStats = async (req, res, next) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    try {
        const income = await Order.aggregate([
            {
                $match: { createdAt: { $gte: previousMonth}}
            },
            {
                $project: {
                    month: { $month: '$createdAt'},
                    sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                },
            },
        ])
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getAllOrder,
    getStats,
}