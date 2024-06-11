import { Router } from "express";
import { createOrder, deleteOrder, getAllOrder, getOrder, getStats, updateOrder } from "../controllers/orderController.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../helpers/verifyToken.js";

const router = Router();

router.get('/', verifyTokenAndAuthorization,getAllOrder)
router.get('find/:id', verifyTokenAndAuthorization, getOrder)
router.post('/', verifyTokenAndAuthorization, createOrder)
router.delete('/:id', verifyTokenAndAuthorization, deleteOrder)
router.put('/:id', verifyTokenAndAuthorization, updateOrder)
router.get('/income', verifyTokenAndAdmin, getStats)

export default router