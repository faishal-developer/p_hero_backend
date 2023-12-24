import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { Quiz_numberFilterableFields } from './quiz_numbers.constant';
import { QuizeMarksService } from './quiz_numbers.service';

const createQuizMarks = catchAsync(async (req: Request, res: Response) => {
  const result = await QuizeMarksService.createQuizMarks(req.body);
  console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const getQuizMarkss = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, Quiz_numberFilterableFields);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
  const result = await QuizeMarksService.getQuizeMarkss(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleQuizMarks = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await QuizeMarksService.getSingleQuizeMarks(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const updateSingleQuizMarks = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await QuizeMarksService.updateSingleQuizeMarks(id, data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OK',
      data: result,
    });
  }
);

const deleteSingleQuizMarks = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    await QuizeMarksService.deleteSingleQuizeMarks(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books deleted successfully',
      data: {},
    });
  }
);

export const QuizMarksController = {
  createQuizMarks,
  getQuizMarkss,
  getSingleQuizMarks,
  updateSingleQuizMarks,
  deleteSingleQuizMarks,
};
