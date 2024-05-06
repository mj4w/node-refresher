import express from "express"
import { 
    getAllProducts,
    getAllProductsStatic
} from "../controllers/product"

const router = express.Router()

router.get('/static', getAllProductsStatic)
router.get('/', getAllProducts)


export default router