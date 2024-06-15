import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z.string({ required_error: 'Password is required' }),
    phone: z.string({ required_error: 'Phone is required' }),
    role: z.enum(['admin', 'user']).default('user'),
    address: z.string({ required_error: 'Address is required' }),
  }),
});

export const userValidation = {
  userValidationSchema,
};
