import bcrypt from 'bcrypt';
import User from '../models/User.js';

// Find a user by email
export const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        console.error("Error finding user by email:", error);
        throw new Error("Database query failed");
    }
};

// Create a new user with hashed password
export const createUser = async (userData) => {
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({ ...userData, password: hashedPassword });
        
        return await user.save();
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("User creation failed");
    }
};

// Find a user by ID, excluding the password field
export const findUserById = async (id) => {
    try {
        return await User.findById(id).select('-password');
    } catch (error) {
        console.error("Error finding user by ID:", error);
        throw new Error("User not found");
    }
};

// Update a user's profile (prevents password update directly)
export const updateUserProfile = async (id, updateData) => {
    try {
        // Prevent password updates directly
        if (updateData.password) {
            throw new Error("Password updates are not allowed through this endpoint");
        }

        return await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw new Error("User update failed");
    }
};
