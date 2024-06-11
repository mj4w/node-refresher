import { Router } from "express";
import Stripe from "stripe";
import environment from "../env.js";

const router = Router();
const stripe = new Stripe(environment.stripe_key);

router.post('/payment', async (req, res) => {
    try {
        const { tokenId, amount } = req.body;

        const charge = await stripe.charges.create({
            source: tokenId,
            amount: amount,
            currency: "usd",
        });

        res.status(200).json(charge);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
