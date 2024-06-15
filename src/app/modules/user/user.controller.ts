import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import { TUser } from './user.interface';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const user: Partial<TUser> = req.body;

  const result = await UserServices.loginUserWithDB(user as TUser);

  res
    .status(StatusCodes.OK)
    .json({
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User logged in successfully',
      token: result.token,
      data: result.user,
    });
});

export const userController = {
  createUser,
  loginUser,
};
