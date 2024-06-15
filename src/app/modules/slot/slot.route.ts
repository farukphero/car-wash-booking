import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { slotValidation } from './slot.validation';
import { slotController } from './slot.controller';
import authorization from '../../middlewares/authorization';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router
  .route('/services/slots')
  .post(
    authorization(USER_ROLE.admin),
    validateRequest(slotValidation.slotValidationSchema),
    slotController.createSlots,
  );
router.route('/slots/availability').get(slotController.getSlotWithQueryFromDB);

export const SlotRoutes = router;
