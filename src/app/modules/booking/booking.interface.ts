import { Types } from 'mongoose';

export interface TBooking {
  customer: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: TVehicle;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}

export type TVehicle =
  | 'car'
  | 'truck'
  | 'SUV'
  | 'van'
  | 'motorcycle'
  | 'bus'
  | 'electricVehicle'
  | 'hybridVehicle'
  | 'bicycle'
  | 'tractor';
