import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await AuthService.register(req.body);
            return res.status(201).json({ data: { id: user.id, email: user.email, name: user.name } });
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const { user, token } = await AuthService.login(email, password);
            return res.json({ data: { user: { id: user.id, email: user.email, name: user.name }, token } });
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();

