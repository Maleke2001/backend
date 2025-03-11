import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    console.log("Request Body:", req.body); // Log request body

    try {
        const { name, image, category, new_price, old_price } = req.body;

        if (!name || !image || !category || !new_price || !old_price) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields and an image"
            });
        }

        const product = new Product({
            name,
            image,
            category,
            new_price,
            old_price
        });

        await product.save();
        console.log("Product saved successfully!");
        res.json({ success: true, name });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ success: false, message: "Error creating product" });
    }
};

 export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.body.id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        console.log("deleted");
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ success: false, message: "Error deleting product" });
    }
}

export const getProduct =async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("All products fetched successfully");
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error while fetching products" });
    }
}

