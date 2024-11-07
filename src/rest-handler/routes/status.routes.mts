import { Router } from 'express';
import { health, ready } from '../controllers/status.controller.mjs';

const statusRoutes = Router();

statusRoutes.get('/health', health);
statusRoutes.get('/ready', ready);

export { statusRoutes };
