import { Router } from "express";
import {
     loginUser, 
     registerUser 
} from "../controllers/authController.js";


const router = Router();

// register
router.post('/register', registerUser)

// Login 
router.post('/login', loginUser)




export default router