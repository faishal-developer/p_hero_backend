import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?.id;
  const result = await userService.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result ? 'OK' : 'NOT FOUND',
    data: result,
  });
});

const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await userService.updateSingleUser(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await userService.deleteSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Uers deleted successfully',
    data: {},
  });
});

export const userController = {
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  getProfile,
};
