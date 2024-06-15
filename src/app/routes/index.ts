import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { SlotRoutes } from '../modules/slot/slot.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/',
    route: ServiceRoutes,
  },
  {
    path: '/',
    route: SlotRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
