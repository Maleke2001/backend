import { z } from 'zod';

export const adminRegisterSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters'),
    email: z.string()
        .email('Invalid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    adminCode: z.string()
        .min(1, 'Admin code is required')
});

export const loginSchema = z.object({
    email: z.string()
        .email('Invalid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
});