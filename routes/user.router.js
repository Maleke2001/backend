// routes/user.router.js
import express from "express";
import { registerUser, loginUser, getProtectedData } from "../controllers/user.controller.js"; // Import your controller functions
import authenticate from "../middleware/authenticate.js"

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

// Example protected route (replace with your actual protected routes)
router.get("/protectedData", authenticate, getProtectedData);

export default router;