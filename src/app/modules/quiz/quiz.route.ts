import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { QuizController } from './quiz.controller';
import { QuizZodSchema } from './quiz.zod';

const router = express.Router();

router.post(
  '/create-quiz',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(QuizZodSchema.create),
  QuizController.createQuizs
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(QuizZodSchema.update),
  QuizController.updateSingleQuiz
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  QuizController.deleteSingleQuiz
);
router.get('/:id', QuizController.getSingleQuiz);
router.get('/', QuizController.getQuizs);

export const QuizRoutes = router;
