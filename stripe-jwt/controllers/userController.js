import CryptoJS from "crypto-js";
import environment from "../env.js";
import User from "../models/User.js";

const updateUser = async (req,res,next) => {
    if (req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            environment.pass_key,
        ).toString()      
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true})
        res.status(200).json(updateUser);
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req,res,next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted!")
    } catch (error) {
        next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json('User not found!');
        }
        const { password, ...noPasswordInclude } = user._doc;
        res.status(200).json(noPasswordInclude);
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req,res,next) => {
    try {
        const query = req.query.new;
        const user = query ? await User.find().sort({ _id: -1 }).limit() : await User.find();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const userStats = async (req,res,next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            {$match: { createdAt: { $gte: lastYear}}},
            { 
                $project: {
                    month: { $month : "$createdAt"},
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1 },
                }
            }
        ])
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    userStats,
}