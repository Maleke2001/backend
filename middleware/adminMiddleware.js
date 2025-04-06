import { HTTP_STATUS } from '../constants/apiConstants.js';

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(HTTP_STATUS.UNAUTHORIZED);
        throw new Error('Not authorized as admin');
    }
};