import { asyncWrapper } from '../middleware/asyncHandler.js';
import Cart from '../models/Cart.js';
import { HTTP_STATUS } from '../constants/apiConstants.js';

export const addToCart = asyncWrapper(async (req, res) => {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            items: [{ product: productId, quantity }]
        });
    } else {
        const existingItem = cart.items.find(item => 
            item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity = quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
    }

    res.status(HTTP_STATUS.OK).json(cart);
});

export const getCart = asyncWrapper(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id })
        .populate('items.product', 'name price image');
    res.status(HTTP_STATUS.OK).json(cart);
});

export const removeFromCart = asyncWrapper(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        res.status(HTTP_STATUS.NOT_FOUND);
        throw new Error('Cart not found');
    }

    cart.items = cart.items.filter(item => 
        item.product.toString() !== req.params.productId
    );
    await cart.save();
    
    res.status(HTTP_STATUS.OK).json(cart);
});