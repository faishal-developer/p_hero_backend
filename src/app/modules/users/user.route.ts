import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { authZodSchema } from '../auth/auth.zod';
import { userController } from './user.controller';

const router = express.Router();

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(authZodSchema.update),
  userController.updateSingleUser
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  userController.deleteSingleUser
);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.getSingleUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), userController.getUsers);

export const userRoutes = router;
