import express from 'express';
import { registerUser, loginUser, getUserProfile, registerAdmin } from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/register-admin', registerAdmin);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;