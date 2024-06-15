import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema: Schema<TSlot> = new Schema<TSlot>(
  {
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: [true, 'Date is required'] },
    startTime: { type: String, required: [true, 'Start time is required'] },
    endTime: { type: String, required: [true, 'End time is required'] },
    isBooked: {
      type: String,
      enum: ['available', 'booked', 'canceled'],
      default: 'available',
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

export const Slot = model<TSlot>('Slot', slotSchema);
