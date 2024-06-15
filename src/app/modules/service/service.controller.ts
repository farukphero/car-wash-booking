import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceServices } from './service.service';

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createServiceIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});
const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServices();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Services retrieved successfully',
    data: result,
  });
});
const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ServiceServices.getSingleService(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  });
});
const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await ServiceServices.updateService(id as string, data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});
const softDeleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
 

  const result = await ServiceServices.softDeleteService(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const serviceController = {
  createService,
  getSingleService,
  getAllServices,
  updateService,
  softDeleteService
};
