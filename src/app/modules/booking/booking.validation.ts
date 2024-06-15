import mongoose from 'mongoose';
import { z } from 'zod';

const bookingValidationSchema = z.object({
  body: z.object({
    customer: z
      .string({ required_error: 'Customer is required' })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid customer ID',
      })
      .optional(),
    service: z
      .string({ required_error: 'Service is required' })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid service ID',
      })
      .optional(),
    slot: z
      .string({ required_error: 'Slot is required' })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid slot ID',
      })
      .optional(),
    vehicleType: z.enum([
      'car',
      'truck',
      'SUV',
      'van',
      'motorcycle',
      'bus',
      'electricVehicle',
      'hybridVehicle',
      'bicycle',
      'tractor',
    ]),
    vehicleBrand: z.string({ required_error: 'Vehicle brand is required' }),
    vehicleModel: z.string({ required_error: 'Vehicle model is required' }),
    manufacturingYear: z
      .number()
      .min(1886, 'Manufacturing year must be greater than 1885')
      .max(
        new Date().getFullYear(),
        'Manufacturing year cannot be in the future',
      ),
    registrationPlate: z.string({
      required_error: 'Registration plate is required',
    }),
  }),
});

export const bookingValidation = {
  bookingValidationSchema,
};
