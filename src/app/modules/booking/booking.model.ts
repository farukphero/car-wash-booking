import { Schema, model, Document } from 'mongoose';
import { TBooking } from './booking.interface';
import { vehicles } from './booking.constant';

const bookingSchema: Schema<TBooking> = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service id is required'],
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: 'Slot',
      required: [true, 'Slot id is required'],
    },
    vehicleType: {
      type: String,
      enum: vehicles,
      required: [true, 'Vehicle Type is required'],
    },
    vehicleBrand: { type: String, required: [true, 'Vehicle Brand is required'] },
    vehicleModel: { type: String, required: [true, 'Vehicle Model is required'] },
    manufacturingYear: {
      type: Number,
      required: [true, 'Manufacturing Year is required'],
    },
    registrationPlate: {
      type: String,
      required: [true, 'Registration Plate is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Create and export the model
export const Booking = model<TBooking>('Booking', bookingSchema);
