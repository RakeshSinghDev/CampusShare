const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  email: z
    .string()
    .min(1, 'Campus email is required')
    .email('Please enter a valid email address')
    .transform((val) => val.toLowerCase().trim()),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  college: z.string().min(2, 'College / University is required'),
  course: z.string().optional().default(''),
  branch: z.string().optional().default(''),
  academicYear: z.string().optional().default(''),
  campus: z.string().min(2, 'Campus location is required'),
});

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Campus email is required')
    .email('Please enter a valid email address')
    .transform((val) => val.toLowerCase().trim()),
  password: z.string().min(1, 'Password is required'),
});

const googleAuthSchema = z.object({
  idToken: z.string().min(1, 'Google credential ID token is required'),
});

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Campus email is required')
    .email('Please enter a valid email address')
    .transform((val) => val.toLowerCase().trim()),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

module.exports = {
  registerSchema,
  loginSchema,
  googleAuthSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
};
