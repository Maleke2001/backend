import { asyncWrapper } from '../middleware/asyncHandler.js';
import Category from '../models/Category.js';
import { HTTP_STATUS } from '../constants/apiConstants.js';

export const createCategory = asyncWrapper(async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(HTTP_STATUS.CREATED).json(category);
});

export const getCategories = asyncWrapper(async (req, res) => {
    const categories = await Category.find({});
    res.status(HTTP_STATUS.OK).json(categories);
});

export const deleteCategory = asyncWrapper(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        res.status(HTTP_STATUS.NOT_FOUND);
        throw new Error('Category not found');
    }
    res.status(HTTP_STATUS.OK).json({ message: 'Category removed' });
});