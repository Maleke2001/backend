import express from 'express';
import upload from "../middleware/uploadMiddleware.js";
import { createCategory, getCategories } from '../controllers/category.controller.js';

const router = express.Router();

// Creating category (with image upload)
router.post("/addCategory", upload.single("image"), createCategory);

// Get all categories
router.get("/", getCategories);

export default router;
