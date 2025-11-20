import { Router } from 'express';
import AuthController from './auth.controller';
import { validateBody } from '../../../middleware/validateResource';
import { registerSchema, loginSchema } from './auth.validator';

const router = Router();

router.post('/register', validateBody(registerSchema), AuthController.register);
router.post('/login', validateBody(loginSchema), AuthController.login);

export default router;
