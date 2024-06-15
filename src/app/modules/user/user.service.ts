import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new AppError(StatusCodes.CONFLICT, 'User already exist.');
  }

  const newUser = new User(payload);
  await newUser.save();

  return newUser;
};

const loginUserWithDB = async (payload: Partial<TUser>) => {
  const { email, password } = payload;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No user found.');
  }

  const isPasswordValid = await existingUser.comparePassword(
    password as string,
  );

  if (!isPasswordValid) {
    throw new Error('Invalid password!');
  }

  const jwtPayload = {
    email: existingUser.email,
    role: existingUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token: accessToken,
    user: existingUser,
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUserWithDB
};
