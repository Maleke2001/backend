import { asyncWrapper } from '../middleware/asyncHandler.js';
import Product from '../models/Product.js';
import { HTTP_STATUS } from '../constants/apiConstants.js';

// Admin: Create Product
export const createProduct = asyncWrapper(async (req, res) => {
    const { name, image, category, new_price, old_price } = req.body;

    const product = await Product.create({
        name,
        image,
        category,
        new_price,
        old_price,
        user: req.user._id
    });

    res.status(HTTP_STATUS.CREATED).json(product);
});

// Admin: Update Product
export const updateProduct = asyncWrapper(async (req, res) => {
    const { name, image, category, new_price, old_price } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(HTTP_STATUS.NOT_FOUND);
        throw new Error('Product not found');
    }

    product.name = name || product.name;
    product.image = image || product.image;
    product.category = category || product.category;
    product.new_price = new_price || product.new_price;
    product.old_price = old_price || product.old_price;

    const updatedProduct = await product.save();
    res.status(HTTP_STATUS.OK).json(updatedProduct);
});

// Admin: Delete Product
export const deleteProduct = asyncWrapper(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(HTTP_STATUS.NOT_FOUND);
        throw new Error('Product not found');
    }

    await product.deleteOne();
    res.status(HTTP_STATUS.OK).json({ message: 'Product removed' });
});

// Get all products (Public)
export const getProducts = asyncWrapper(async (req, res) => {
    const products = await Product.find({});
    res.status(HTTP_STATUS.OK).json(products);
});

// Get single product (Public)
export const getProductById = asyncWrapper(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(HTTP_STATUS.NOT_FOUND);
        throw new Error('Product not found');
    }
    res.status(HTTP_STATUS.OK).json(product);
});

