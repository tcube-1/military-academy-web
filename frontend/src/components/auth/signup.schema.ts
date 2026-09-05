import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters'),

    email: z.string().trim().email('Please enter a valid email address'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(72, 'Password must not exceed 72 characters'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),
    // Example of how to add to your zod schema
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
    isContestant: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
