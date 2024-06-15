import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotService } from './slot.service';

const createSlots = catchAsync(async (req, res) => {
  const result = await SlotService.createSlotIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Slots created successfully',
    data: result,
  });
});
const getSlotWithQueryFromDB = catchAsync(async (req, res) => {
  const result = await SlotService.getSlotWithQueryFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Available slots retrieved successfully',
    data: result,
  });
});

export const slotController = {
  createSlots,
  getSlotWithQueryFromDB,
};
