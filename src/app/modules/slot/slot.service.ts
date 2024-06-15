import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { TSlot } from './slot.interface';
import AppError from '../../errors/AppError';
import { Service } from '../service/service.model';
import { Slot } from './slot.model';

const createSlotIntoDB = async (payload: TSlot) => {
  const { service, startTime, endTime } = payload;
  const duration = 60;

  // Convert time to minutes
  const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = convertTimeToMinutes(startTime);
  const endMinutes = convertTimeToMinutes(endTime);

  if (startMinutes > endMinutes) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Start time must be earlier than end time.',
    );
  }
  if (startMinutes === endMinutes) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Start time and end time can not be same',
    );
  }

  // Calculate total duration and number of slots
  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = totalDuration / duration;

  // Validate service ID
  if (!service || !Types.ObjectId.isValid(service)) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Invalid or missing service id',
    );
  }

  // Retrieve the service using the service ID
  const existingService = await Service.findById(service);
  if (!existingService) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No service available');
  }

  // Generate and save slots
  const slots = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartMinutes = startMinutes + i * duration;
    const slotEndMinutes = slotStartMinutes + duration;

    const convertMinutesToTime = (minutes: number) => {
      const hrs = Math.floor(minutes / 60)
        .toString()
        .padStart(2, '0');
      const mins = (minutes % 60).toString().padStart(2, '0');
      return `${hrs}:${mins}`;
    };

    const slot = {
      service: existingService._id,
      date: payload.date,
      startTime: convertMinutesToTime(slotStartMinutes),
      endTime: convertMinutesToTime(slotEndMinutes),
    };

    const savedSlot = await Slot.create(slot);
    slots.push(savedSlot);
  }

  return slots;
};

const getSlotWithQueryFromDB = async (query: Record<string, unknown>) => {
  let { date, serviceId } = query;

  let serviceObjectId = null;
  if (serviceId && Types.ObjectId.isValid(serviceId as string)) {
    serviceObjectId = new Types.ObjectId(serviceId as string);
  }

  const baseQuery: Record<string, unknown> = {};
  if (date) {
    baseQuery.date = new Date(date as string);
  }
  if (serviceObjectId) {
    baseQuery.service = serviceObjectId;
  }

  const result = await Slot.find(baseQuery)
    .populate('service')
    .sort({ createdAt: -1 })
    .exec();

  return result;
};

export const SlotService = {
  createSlotIntoDB,
  getSlotWithQueryFromDB,
};
