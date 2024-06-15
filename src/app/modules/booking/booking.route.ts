import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import authorization from '../../middlewares/authorization';
import { USER_ROLE } from '../user/user.const';
import { bookingValidation } from './booking.validation';
import { bookingController } from './booking.controller';

const router = express.Router();

router
  .route('/bookings')
  .post(
    authorization(USER_ROLE.user),
    validateRequest(bookingValidation.bookingValidationSchema),
    bookingController.createBooking,
  )
  .get(authorization(USER_ROLE.admin), bookingController.getAllBookings);
router
  .route('/my-bookings')
  .get(authorization(USER_ROLE.user), bookingController.getMyBookings);
// router
//   .route('/services/:id')
//   .get(serviceController.getSingleService)
//   .put(authorization(USER_ROLE.admin), serviceController.updateService)
//   .delete(authorization(USER_ROLE.admin), serviceController.softDeleteService);

export const BookingRoutes = router;
