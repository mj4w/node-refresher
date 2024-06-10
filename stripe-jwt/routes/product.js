import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productController.js";
import { verifyTokenAndAuthorization } from "../helpers/verifyToken.js";

const router = Router();

router.get('/', getAllProducts)
router.get('/find/:id', verifyTokenAndAuthorization, getProduct)
router.post('/', verifyTokenAndAuthorization,createProduct)
router.put('/:id', verifyTokenAndAuthorization, updateProduct)
router.delete('/:id', verifyTokenAndAuthorization, deleteProduct)



export default router