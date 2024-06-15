import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { Service } from '../service/service.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Slot } from '../slot/slot.model';
import { User } from '../user/user.model';
import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

const createBookingIntoDB = async (payload: TBooking) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { service, slot, customer, ...bookingData } = payload;

    // Check if user exists
    const existingUser = await User.findById(customer).session(session);
    if (!existingUser) {
      throw new AppError(StatusCodes.NOT_FOUND, 'No user found');
    }

    // Check if service exists
    const existingService = await Service.findById(service).session(session);
    if (!existingService) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Invalid service Id');
    }

    // Check if slot exists
    const existingSlot = await Slot.findById(slot).session(session);
    if (!existingSlot) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Invalid slot Id');
    }

    // Create booking object including references and payload data
    const booked = {
      customer: existingUser._id,
      service: existingService._id,
      slot: existingSlot._id,
      ...bookingData,
    };

    // Create the booking in the database within the transaction
    const createdBooking = await Booking.create([booked], { session });

    // Update the slot to mark it as booked within the transaction
    await Slot.findByIdAndUpdate(
      booked.slot,
      { $set: { isBooked: 'booked' } },
      { new: true, runValidators: true, session },
    );

    // Populate references (customer, service, slot) in createdBooking
    const populatedBooking = await Booking.findById(createdBooking[0]._id)
      .populate('customer', '_id name email phone address')
      .populate('service', '_id name description price duration isDeleted')
      .populate('slot', '_id service date startTime endTime isBooked')
      .session(session)
      .exec();

    if (!populatedBooking) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Booking not found');
    }

    // Transform the populated booking object as needed
    const transformedBooking = {
      ...populatedBooking.toObject(),
    };

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return transformedBooking;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error instanceof Error) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  }
};

const getAllBookings = async () => {
  const booking = await Booking.find({})
    .populate('customer', '_id name email phone address')
    .populate('service', '_id name description price duration isDeleted')
    .populate('slot', '_id service date startTime endTime isBooked')
    .exec();

  return booking;
};
const getMyBookings = async (user: JwtPayload) => {
  const { email } = user;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const booking = await Booking.findOne({ customer: existingUser._id })
    .populate('service', '_id name description price duration isDeleted')
    .populate('slot', '_id service date startTime endTime isBooked')
    .select('-customer')
    .exec();
  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No data found.');
  }
  return booking;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookings,
  getMyBookings,
};
