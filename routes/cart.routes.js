import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.use(protect); // All cart routes need authentication

router.post('/add', addToCart);
router.get('/', getCart);
router.delete('/remove/:productId', removeFromCart);

export default router;