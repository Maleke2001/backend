import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
    console.log("Request Body:", req.body); // Log request body

    try {
        const { name, image} = req.body;

        if (!name || !image ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields and an image"
            });
        }

        const category = new Category({
            name,
            image,
        });

        await category.save();
        console.log("Category saved successfully!");
        res.json({ success: true, name });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ success: false, message: "Error creating product" });
    }
};

export const getCategory =async (req, res) => {
    try {
        const category = await Category.find({});
        console.log("All category fetched successfully");
        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error while fetching products" });
    }
}