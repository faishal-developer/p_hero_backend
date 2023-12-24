import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { QuizMarksController } from './quiz_numbers.controller';
import { QuizMarksZodSchema } from './quiz_numbers.zod';

const router = express.Router();

router.post(
  '/create-quizmarks',
  validateRequest(QuizMarksZodSchema.create),
  QuizMarksController.createQuizMarks
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(QuizMarksZodSchema.update),
  QuizMarksController.updateSingleQuizMarks
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  QuizMarksController.deleteSingleQuizMarks
);
router.get('/:id', QuizMarksController.getSingleQuizMarks);
router.get('/', QuizMarksController.getQuizMarkss);

export const QuizMarksRoutes = router;
