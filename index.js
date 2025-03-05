const port = 5000;
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import bcrypt from "bcrypt";  // Correct ES Module import
import fs from "fs";
import Product from "./models/Product.js"; 
import User from "./models/User.js";

const app = express(); 

app.use(express.json()); 
app.use(cors());

// Ensure upload directory exists
const uploadDir = "./upload/images";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Initialize our database
const mongoURI = "mongodb+srv://motshabielizabeth1:kn3FVJyi5b3LMeNN@cluster0.ldq5a.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image storage engine configured disk storage
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {  
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve uploaded images statically
app.use('/images', express.static('upload/images'));

// Creating an upload endpoint for images
app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }

    res.json({ 
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Creating product
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product = products[products.length - 1];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });

    console.log(product);
    await product.save();
    console.log("Successfully saved");
    res.json({ success: true, name: req.body.name });
});

// API for deleting a product
app.delete('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("deleted");
    res.json({
        success: true,
        name: req.body.name
    });
});

// Creating API for getting all products
app.get("/allproducts", async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All products fetched successfully");
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error while fetching products" });
    }
});

// Creating Endpoint for registering a user
app.post('/signup', async (req, res) => {
    try {
        let check = await User.findOne({ email: req.body.email });
      
        if (check) {
            return res.status(400).json({ success: false, message: "Existing user found with same email address" });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash password before storing

        // Creating new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,  // Store hashed password
            cartData: cart
        });

        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
        res.json({ success: true, token });

    } catch (error) {
        console.error("Couldn't register:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Creating endpoint for user login
app.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ success: false, errors: "Wrong Email Id" });
        }

        // Debugging logs
        console.log("Entered Password:", req.body.password);
        console.log("Stored Hashed Password:", user.password);

        // Ensure both password fields are valid strings before comparing
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
});


// Start the server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});
