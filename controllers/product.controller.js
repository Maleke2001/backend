import { asyncWrapper } from '../middleware/asyncHandler.js';
import Product from '../models/Product.js';
import { HTTP_STATUS } from '../constants/apiConstants.js';

export const createProduct = asyncWrapper(async (req, res) => {
    const { name, image, category, new_price, old_price } = req.body;

    if (!name || !image || !category || !new_price || !old_price) {
        res.status(HTTP_STATUS.BAD_REQUEST);
        throw new Error('Please provide all required fields');
    }

    const product = await Product.create(req.body);
    res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: 'Product created successfully',
        product
    });
});

export const getProduct = asyncWrapper(async (req, res) => {
    const products = await Product.find({}).populate('category');
    res.status(HTTP_STATUS.OK).json({
        success: true,
        count: products.length,
        products
    });
});

export const deleteProduct = asyncWrapper(async (req, res) => {
    const product = await Product.findOneAndDelete({ _id: req.body.id });
    if (!product) {
        res.status(HTTP_STATUS.NOT_FOUND);
        throw new Error('Product not found');
    }
    res.status(HTTP_STATUS.OK).json({ 
        success: true, 
        message: 'Product deleted successfully',
        productId: req.body.id
    });
});

export const updateProduct = asyncWrapper(async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
    );
    
    if (!product) {
        res.status(HTTP_STATUS.NOT_FOUND);
        throw new Error('Product not found');
    }

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Product updated successfully',
        product
    });
});

export const getProductById = asyncWrapper(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
    
    if (!product) {
        res.status(HTTP_STATUS.NOT_FOUND);
        throw new Error('Product not found');
    }

    res.status(HTTP_STATUS.OK).json({
        success: true,
        product
    });
});

