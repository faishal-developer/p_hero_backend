import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { authService } from './auth.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const password = await bcrypt.hash(
    req.body.password as string,
    Number(config.bycrypt_salt_rounds)
  );
  const result: Partial<User> | null = await authService.signUp({
    ...req.body,
    password,
  });
  if (result?.password) {
    delete result.password;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;
  const { refreshToken, ...others } = await authService.login(loginData);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Logged in successfully`,
    token: others.accessToken,
  });
});

export const authController = {
  signUp,
  login,
};
