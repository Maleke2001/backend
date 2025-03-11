import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.router.js";
import uploadRoutes from "./routes/upload.routes.js"; // Import upload route
import fs from "fs";

dotenv.config();

const app = express();
const port = 5000;

// Ensure that the upload directory exists
const uploadDir = "./upload/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(express.json()); 
app.use(cors());




// Serve uploaded images statically
app.use("/images", express.static("upload/images"));
app.use("/api/upload", uploadRoutes);

// Register routes
app.use("/api/product", productRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/upload", uploadRoutes);  // Register upload route

// Start the server
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
