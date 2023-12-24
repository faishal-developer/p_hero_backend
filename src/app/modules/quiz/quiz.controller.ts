import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { QuizFilterableFields } from './quiz.constant';
import { QuizService } from './quiz.service';

const createQuizs = catchAsync(async (req: Request, res: Response) => {
  const result = await QuizService.createQuizs(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const getQuizs = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, QuizFilterableFields);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
  const result = await QuizService.getQuizs(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleQuiz = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await QuizService.getSingleQuiz(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const updateSingleQuiz = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await QuizService.updateSingleQuiz(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const deleteSingleQuiz = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await QuizService.deleteSingleQuiz(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books deleted successfully',
    data: {},
  });
});

export const QuizController = {
  createQuizs,
  getQuizs,
  getSingleQuiz,
  updateSingleQuiz,
  deleteSingleQuiz,
};
