import { z } from 'zod';

const serviceValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    price: z
      .number({ required_error: 'Price is required' })
      .nonnegative('Price must be a positive number'),
    duration: z.number().positive('Duration must be a positive number'),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const serviceValidation = {
  serviceValidationSchema,
};
