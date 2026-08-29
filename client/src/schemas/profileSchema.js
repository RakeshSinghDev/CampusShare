import { z } from 'zod';

export const editProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid campus email address'),
  university: z.string().min(2, 'University name is required'),
  department: z.string().min(2, 'Department / Faculty name is required'),
  major: z.string().min(2, 'Major / Branch code is required'),
  academicYear: z.string().min(1, 'Academic year is required'),
  campus: z.string().min(2, 'Campus location is required'),
  avatarUrl: z.string().optional(),
});
