import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");

export const connectDB = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
      console.error("MongoDB Error:", err);
      process.exit(1);
    });
