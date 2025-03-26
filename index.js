import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from "./routes/upload.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import fs from "fs";
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001; // Changed to 5001

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
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);    // duplicate
app.use("/api/category", categoryRoutes)


// Start the server
// Error handling should be after routes
app.use(errorHandler);

// Add error handling for the server
const server = app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is busy, trying ${port + 1}`);
    server.listen(port + 1);
  } else {
    console.error('Server error:', err);
  }
});
