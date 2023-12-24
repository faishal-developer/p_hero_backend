import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
import { FormController } from './forms.controller';

const router = express.Router();

router.post(
  '/create-form',
  auth(ENUM_USER_ROLE.ADMIN),
  FormController.createForms
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FormController.updateSingleForm
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FormController.deleteSingleForm
);
router.get('/:id', FormController.getSingleForm);
router.get('/', FormController.getForms);

export const FormRoutes = router;
