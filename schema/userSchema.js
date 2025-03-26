import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string()
        .trim()
        .min(2, { message: 'Name must be at least 2 characters' })
        .max(50, { message: 'Name must not exceed 50 characters' })
        .regex(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' }),

    email: z.string()
        .trim()
        .email({ message: 'Invalid email format' }),

    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(30, { message: 'Password must not exceed 30 characters' })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
            message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
        })
});
