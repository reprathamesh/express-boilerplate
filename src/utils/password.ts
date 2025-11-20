import bcrypt from 'bcrypt';
import crypto from 'crypto';

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export function generatePassword(length = 12, options?: { numbers?: boolean; symbols?: boolean; uppercase?: boolean; lowercase?: boolean }): string {
    const nums = options?.numbers ?? true;
    const syms = options?.symbols ?? false;
    const upper = options?.uppercase ?? true;
    const lower = options?.lowercase ?? true;

    let charset = '';
    if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (nums) charset += '0123456789';
    if (syms) charset += '!@#$%^&*()-_=+[]{}|;:,.<>?';

    if (!charset) throw new Error('At least one character set must be enabled');

    const bytes = crypto.randomBytes(length);
    const result: string[] = [];
    for (let i = 0; i < length; i++) {
        const idx = bytes[i] % charset.length;
        result.push(charset.charAt(idx));
    }
    return result.join('');
}

export function generateOTP(length = 6): string {
    if (length <= 0) return '';
    const bytes = crypto.randomBytes(length);
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += String(bytes[i] % 10);
    }
    return otp;
}
