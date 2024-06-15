import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { serviceValidation } from './service.validation';
import { serviceController } from './service.controller';
import authorization from '../../middlewares/authorization';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router
  .route('/services')
  .get(serviceController.getAllServices)
  .post(
    authorization(USER_ROLE.admin),
    validateRequest(serviceValidation.serviceValidationSchema),
    serviceController.createService,
  );
router
  .route('/services/:id')
  .get(serviceController.getSingleService)
  .put(authorization(USER_ROLE.admin), serviceController.updateService)
  .delete(authorization(USER_ROLE.admin), serviceController.softDeleteService);

export const ServiceRoutes = router;
