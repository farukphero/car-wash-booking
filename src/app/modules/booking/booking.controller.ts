import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';

const createBooking = catchAsync(async (req, res) => {
  const user: JwtPayload = req.user as JwtPayload;

  const existingUser = await User.findOne({ email: user.email });
  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found.');
  }

  const payload = {
    ...req.body,
    customer: existingUser._id,
    service: req.body.serviceId,
    slot: req.body.slotId,
  };

  const result = await BookingService.createBookingIntoDB(payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking successful',
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookings();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});
const getMyBookings = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await BookingService.getMyBookings(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
  getMyBookings,
};
