import { HTTP_STATUS } from '../constants/apiConstants.js';

// Not Found Error Handler
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(HTTP_STATUS.NOT_FOUND); 
    next(error);
};

// General Error Handler
export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode >= 400 && res.statusCode < 600 ? res.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: err.message || 'Something went wrong',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
};
