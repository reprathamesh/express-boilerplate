import { Router } from 'express';
import UserController from './user.controller';
import { jwtMiddleware } from '../../../middleware/jwtMiddleware';

const router = Router();

router.get('/me', jwtMiddleware,UserController.getProfile);
router.get('/', jwtMiddleware,UserController.list);

export default router;
