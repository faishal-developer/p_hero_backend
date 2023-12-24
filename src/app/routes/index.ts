import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { userRoutes } from '../modules/users/user.route';
import { QuizRoutes } from '../modules/quiz/quiz.route';
import { FormRoutes } from '../modules/form/forms.route';
import { QuizMarksRoutes } from '../modules/quiz_numbers/quiz_numbers.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/quiz',
    route: QuizRoutes,
  },
  {
    path: '/quizmarks',
    route: QuizMarksRoutes,
  },
  {
    path: '/form',
    route: FormRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
