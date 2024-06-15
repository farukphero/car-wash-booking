import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TService } from './service.interface';
import { Service } from './service.model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);

  return result;
};
const getAllServices = async () => {
  const service = await Service.find({});
  if (service.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No services found.');
  }

  return service;
};
const getSingleService = async (id: string) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No data found.');
  }

  return service;
};
const updateService = async (id: string, payload: Partial<TService>) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No data found.');
  }
  const updateService = await Service.findByIdAndUpdate(
    id,
    { $set: payload },
    { upsert: true, new: true, runValidators: true },
  );

  return updateService;
};
const softDeleteService = async (id: string) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No data found.');
  }
  const updateService = await Service.findByIdAndUpdate(
    id,
    { $set: { isDeleted: true } },
    { upsert: true, new: true, runValidators: true },
  );

  return updateService;
};

export const ServiceServices = {
  createServiceIntoDB,
  getSingleService,
  getAllServices,
  updateService,
  softDeleteService,
};
