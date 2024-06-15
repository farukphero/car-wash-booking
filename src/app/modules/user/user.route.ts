import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router
  .route('/signup')
  .post(
    validateRequest(userValidation.userValidationSchema),
    userController.createUser,
  );
router.route('/login').post(userController.loginUser);

export const UserRoutes = router;
