import { Router } from 'express';
import { statusRoutes } from './status.routes.mjs';
import customRoutes from './custom.routes.mjs';

const generalRouter = Router({ caseSensitive: true });

const routes = [
  { path: '/', router: customRoutes },
  { path: '/status', router: statusRoutes }
];

routes.forEach(
  ({ path, router }) => generalRouter.use(path, router),
);

export { generalRouter };
