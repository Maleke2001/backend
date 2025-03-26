const validCategories = ['nike', 'adidas', 'pike'];

const validateCategory = (req, res, next) => {
    const category = req.body.category;
    
    if (!category) {
        return res.status(400).json({ message: 'Category is required' });
    }

    if (!validCategories.includes(category.toLowerCase())) {
        return res.status(400).json({ 
            message: 'Invalid category. Must be one of: ' + validCategories.join(', ')
        });
    }

    next();
};

export default validateCategory;