import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
    createOrder,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivered
} from '../controllers/order.controller.js';

const router = express.Router();

router.route('/')
    .post(protect, createOrder)
    .get(protect, isAdmin, getOrders);

router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);

export default router;