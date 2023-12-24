import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import { authZodSchema } from './auth.zod';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(authZodSchema.create),
  authController.signUp
);

router.post(
  '/signin',
  validateRequest(authZodSchema.login),
  authController.login
);

export const authRoutes = router;
