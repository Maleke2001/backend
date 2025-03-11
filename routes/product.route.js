import express from "express";
import { createProduct, deleteProduct, getProduct } from "../controllers/product.controller.js";
import { upload } from "../middleware/uploadMiddleware.js";



const router = express.Router();

// Creating product (with image upload)
router.post("/addproduct", upload.single("image"), createProduct);

// API for deleting a product
router.delete("/removeproduct", deleteProduct);

// API for getting all products
router.get("/allproducts", getProduct);


export default router;
