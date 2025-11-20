import Joi, { ObjectSchema } from 'joi';

export const name = Joi.string().trim().min(2).max(255).regex(/^[\p{L} .'-]+$/u).label('name');
export const address = Joi.string().trim().min(3).max(1024).label('address');
export const pincode = Joi.string().trim().pattern(/^\d{4,6}$/).label('pincode');
export const email = Joi.string().trim().email().label('email');
export const mobile = Joi.string().trim().pattern(/^\+?[0-9]{7,15}$/).label('mobile');
export const gstNumber = Joi.string().trim().uppercase().pattern(/^[0-9A-Z]{15}$/).label('gst_number');

export function makeOptional<T extends ObjectSchema>(schema: T): T {
    const described = schema.describe();
    const keys = described.keys ? Object.keys(described.keys) : [];
    if (keys.length === 0) return schema;
    // @ts-ignore - Joi types don't include fork on schema generics nicely here
    return (schema as any).fork(keys, (s: any) => s.optional());
}

export default {
    name,
    address,
    pincode,
    email,
    mobile,
    gstNumber,
    makeOptional,
};
