import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; 
import { registerSchema } from "../schema/userSchema.js"

export const registerUser = async (req, res) => {
    try {
        console.log("Register user request received:", req.body);

        // Validate request body with Zod
        const validatedData = registerSchema.safeParse(req.body);
        
        if (!validatedData.success) {
            console.log("Validation failed:", validatedData.error.errors);
            return res.status(400).json({ 
                success: false, 
                errors: validatedData.error.errors.map(err => err.message) 
            });
        }

        const { name, email, password } = validatedData.data;

        console.log("Finding user with email:", email);
        let user = await User.findOne({ email });
        console.log("User found:", user);

        if (user) {
            console.log("User already exists:", email);
            return res.status(400).json({ success: false, errors: ["User already exists"] });
        }

        console.log("Generating salt...");
        const salt = await bcrypt.genSalt(10);
        console.log("Salt generated:", salt);

        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Password hashed:", hashedPassword);

        console.log("Creating new user...");
        user = new User({ name, email, password: hashedPassword });

        console.log("Saving user to database...");
        await user.save();
        console.log("User saved to database");

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, errors: ["Internal Server Error"] });
    }
};
