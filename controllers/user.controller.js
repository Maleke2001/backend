import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; 

export const registerUser = async (req, res) => {
    try {
        console.log("Register user request received:", req.body); // Log the request body
        const { name, email, password } = req.body;

        console.log("Finding user with email:", email); // Log the email being searched
        let user = await User.findOne({ email });
        console.log("User found:", user); // Log the result of the findOne query

        if (user) {
            console.log("User already exists:", email); // Log if user already exists
            return res.status(400).json({ success: false, errors: "User already exists" });
        }

        console.log("Generating salt..."); // Log before generating salt
        const salt = await bcrypt.genSalt(10);
        console.log("Salt generated:", salt); // Log the generated salt

        console.log("Hashing password..."); // Log before hashing
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Password hashed:", hashedPassword); // Log the hashed password

        console.log("Creating new user..."); // Log before user creation
        user = new User({ name, email, password: hashedPassword });
        console.log("Saving user to database..."); // Log before saving
        await user.save();
        console.log("User saved to database"); // Log after saving the user

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error); // Log the full error
        res.status(500).json({ success: false, errors: "Internal Server Error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ success: false, errors: "Wrong Email Id" });
        }

        if (!req.body.password || typeof req.body.password !== 'string') {
            return res.status(400).json({ success: false, errors: "Invalid password input" });
        }

        if (!user.password || typeof user.password !== 'string') {
            return res.status(500).json({ success: false, errors: "Password not found in database" });
        }

        // Compare passwords
        const passCompare = await bcrypt.compare(req.body.password, user.password);

        if (passCompare) {
            const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
            return res.json({ success: true, token });
        } else {
            return res.status(400).json({ success: false, errors: "Wrong password" });
        }

    } catch (error) {
        console.error("bcrypt error:", error);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
    }
};

// controllers/user.controller.js
// ... (Your existing registerUser and loginUser functions)

export const getProtectedData = (req, res) => {
    // Access user data from req.user (set by the middleware)
    res.json({
      success: true,
      message: "This is protected data",
      user: req.user,
    });
  };
