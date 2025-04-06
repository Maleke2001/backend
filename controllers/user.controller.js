import { asyncWrapper } from '../middleware/asyncHandler.js';
import { registerSchema, loginSchema, adminRegisterSchema } from '../schemas/userSchema.js';
import User from '../models/User.js';
import { HTTP_STATUS } from '../constants/apiConstants.js';
import { loginSchema } from '../schemas/userSchema.js';
import generateToken from '../utils/generateToken.js';

export const registerAdmin = asyncWrapper(async (req, res) => {
    const result = adminRegisterSchema.safeParse(req.body);
    
    if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST);
        throw new Error(result.error.errors[0].message);
    }

    const { name, email, password, adminCode } = result.data;

    if (adminCode !== process.env.ADMIN_CODE) {
        res.status(HTTP_STATUS.UNAUTHORIZED);
        throw new Error('Invalid admin code');
    }

    const adminExists = await User.findOne({ isAdmin: true });
    if (adminExists) {
        res.status(HTTP_STATUS.BAD_REQUEST);
        throw new Error('Admin already exists');
    }

    const admin = await User.create({
        name,
        email,
        password,
        isAdmin: true
    });

    if (admin) {
        res.status(HTTP_STATUS.CREATED).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            isAdmin: admin.isAdmin,
            token: generateToken(admin._id)  // Added token for admin
        });
    }
});
3
export const registerUser = asyncWrapper(async (req, res) => {
    // Validate request body using Zod
    const result = registerSchema.safeParse(req.body);
    
    if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST);
        throw new Error(result.error.errors[0].message);
    }

    const { name, email, password } = result.data;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(HTTP_STATUS.BAD_REQUEST);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(HTTP_STATUS.CREATED).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(HTTP_STATUS.BAD_REQUEST);
        throw new Error('Invalid user data');
    }
});

export const loginUser = asyncWrapper(async (req, res) => {
    // Validate request body
    const result = loginSchema.safeParse(req.body);
    
    if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST);
        throw new Error(result.error.errors[0].message);
    }

    const { email, password } = result.data;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.status(HTTP_STATUS.OK).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(HTTP_STATUS.UNAUTHORIZED);
        throw new Error('Invalid email or password');
    }
});

export const getUserProfile = asyncWrapper(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(API_ENDPOINTS.HTTP_STATUS.OK).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(API_ENDPOINTS.HTTP_STATUS.NOT_FOUND);
        throw new Error('User not found');
    }
});