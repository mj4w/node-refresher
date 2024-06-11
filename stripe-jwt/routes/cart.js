import { Router } from "express";
import { verifyTokenAndAuthorization } from "../helpers/verifyToken.js";
import { createCart, deleteCart, getAllCart, getCart, updateCart } from "../controllers/cartController.js";

const router = Router();

router.post('/', verifyTokenAndAuthorization, createCart);
router.put('/:id', verifyTokenAndAuthorization, updateCart)
router.delete('/:id', verifyTokenAndAuthorization, deleteCart)
router.get('/find/:id', verifyTokenAndAuthorization, getCart)
router.get('/', verifyTokenAndAuthorization, getAllCart)




export default router