import { Schema, model } from 'mongoose';
import { TService } from './service.interface';

const serviceSchema: Schema<TService> = new Schema<TService>(
  {
    name: { type: String, required: [true, 'Service title is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    duration: { type: Number, required: [true, 'Duration is required'] },
    isDeleted: { type: Boolean, default: false },
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

export const Service = model<TService>('Service', serviceSchema);
