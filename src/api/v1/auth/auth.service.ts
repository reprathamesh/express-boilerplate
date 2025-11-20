import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../../../models';
import { env } from '../../../config/app.config';
class AuthService {
    async register(payload: { email: string; password: string; name?: string }) {
        const existing = await User.findOne({ where: { email: payload.email } });
        if (existing) {
            throw new Error('Email already in use');
        }

        const user = await User.create(payload);
        return user;
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('Invalid credentials');

        const valid = await user.checkPassword(password);
        if (!valid) throw new Error('Invalid credentials');

        const token = this.generateToken({ id: user.id, email: user.email, role: user.role });
        return { user, token };
    }

    generateToken(payload: object) {
        return jwt.sign(payload, String(env.JWT_SECRET), { expiresIn: String(env.JWT_EXPIRES_IN) });
    }

    verifyToken(token: string) {
        return jwt.verify(token, String(env.JWT_SECRET));
    }
}

export default new AuthService();
