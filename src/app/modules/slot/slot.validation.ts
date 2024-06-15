import mongoose from 'mongoose';
import { z } from 'zod';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

const slotValidationSchema = z.object({
  body: z.object({
    service: z
      .string({ required_error: 'Service Id is required' })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid service ID',
      }),
    date: z
      .string({ required_error: 'Date is required' })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date',
      }),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
    isBooked: z
      .enum(['available', 'booked', 'canceled'])
      .optional()
      .default('available'),
  }),
});

export const slotValidation = {
  slotValidationSchema,
};
