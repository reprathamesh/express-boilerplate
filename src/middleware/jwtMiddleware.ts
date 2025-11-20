import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/app.config';

export interface AuthRequest extends Request {
    user?: any;
}

export const jwtMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });

    const token = auth.split(' ')[1];
    try {
        const payload = jwt.verify(token, String(env.JWT_SECRET));
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
