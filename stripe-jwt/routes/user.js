import { Router } from "express";
import { deleteUser, getAllUsers, getUser, updateUser, userStats } from "../controllers/userController.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../helpers/verifyToken.js";

const router = Router();

router.get('/', getAllUsers)
router.get('/find/:id', verifyTokenAndAdmin, getUser)
router.get('/stats', verifyTokenAndAdmin, userStats)
router.put('/:id', verifyTokenAndAuthorization,updateUser)
router.delete('/:id', verifyTokenAndAuthorization,deleteUser)




export default router