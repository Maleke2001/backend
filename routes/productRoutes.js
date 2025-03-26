import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import validateCategory from '../middleware/categoryMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected routes (admin only)
router.post('/', 
    protect, 
    admin, 
    upload.single('image'), 
    validateCategory, 
    createProduct
);

router.put('/:id', 
    protect, 
    admin, 
    upload.single('image'), 
    validateCategory, 
    updateProduct
);

router.delete('/:id', protect, admin, deleteProduct);

export default router;