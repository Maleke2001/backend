import express from 'express';
import upload from "../middleware/uploadMiddleware.js";
import { createCategory, getCategory } from '../controllers/category.controller.js';

const router = express.Router();

// Creating product (with image upload)
router.post("/addCategory", upload.single("image"), createCategory);

// API for getting all products
router.get("/", getCategory);

export default router;
