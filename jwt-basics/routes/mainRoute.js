import { Router } from "express";
import {
    login,
    dashboard
} from '../controllers/mainController.js'

const router = Router();

router.get('/dashboard', dashboard)
router.post('/login', login)

export default router
