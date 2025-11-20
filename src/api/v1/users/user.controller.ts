import { Request, Response, NextFunction } from 'express';
import UserService from './user.service';

class UserController {
    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const id = req.user?.id;
            const user = await UserService.getById(id);
            if (!user) return res.status(404).json({ error: 'User not found' });
            return res.json({ data: user });
        } catch (err) {
            next(err);
        }
    }

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.list();
            return res.json({ data: users });
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();

