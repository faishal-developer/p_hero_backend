import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FormFilterableFields } from './form.interface';
import { FormService } from './form.service';

const createForms = catchAsync(async (req: Request, res: Response) => {
  const result = await FormService.createForm(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const getForms = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, FormFilterableFields);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
  const result = await FormService.getForms(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleForm = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FormService.getSingleForm(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const updateSingleForm = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await FormService.updateSingleForm(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const deleteSingleForm = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await FormService.deleteSingleForm(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books deleted successfully',
    data: {},
  });
});

export const FormController = {
  createForms,
  getForms,
  getSingleForm,
  updateSingleForm,
  deleteSingleForm,
};
