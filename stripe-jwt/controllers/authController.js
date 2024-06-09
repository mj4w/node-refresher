import User from '../models/User.js';
import CryptoJS from "crypto-js";
import environment from "../env.js";
import jwt from "jsonwebtoken";

const registerUser = async(req,res,next) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, environment.pass_key).toString(),
        });
        const saveUser = await newUser.save();
        console.log(saveUser); 
        res.status(201).json(saveUser);
    } catch (error) {
        if (error.code === 11000){
            if (error.keyPattern.username) { 
                res.status(400).json({ message: "Username Already Exists"})
            } else if (error.keyPattern.email) {
                res.status(400).json({ message: "Email Already Exists"})
            }
        } else {
            next(error);
        }
    }
}

const loginUser = async(req,res,next) => {
    try {
        const user = await User.findOne({ 
            $or: [{ username: req.body.username} , {email: req.body.email}] 
        });

        if (!user) {
            return res.status(401).json("Invalid Username");
        }
        const hashPassword = CryptoJS.AES.decrypt(user.password, environment.pass_key);
        const password = hashPassword.toString(CryptoJS.enc.Utf8);

        if (password !== req.body.password) {
            return res.status(401).json("Wrong Credentials!");
        }
        
        const accessToken = jwt.sign({
            id: user._id, 
            isAdmin: user.isAdmin,
        }, environment.jwt_key, { expiresIn: "3d"})

        // remove password in json response
        const { password:_, ...noPasswordInclude} = user._doc;
        res.status(200).json({...noPasswordInclude, accessToken});

    } catch (error) {
        next(error);
    }
}

export {
    registerUser,
    loginUser,
}