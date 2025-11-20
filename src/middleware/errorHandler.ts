import { Request, Response, NextFunction } from 'express';
import ApiError from './ApiError';
import { ValidationError as SequelizeValidationError, UniqueConstraintError, ForeignKeyConstraintError } from 'sequelize';

function mapJoiError(err: any) {
    const details = (err.details || []).reduce((acc: Record<string, string>, d: any) => {
        const key = Array.isArray(d.path) ? d.path.join('.') : d.path || d.context?.key || '_';
        acc[key] = d.message;
        return acc;
    }, {});
    return details;
}

function mapSequelizeValidation(err: SequelizeValidationError | UniqueConstraintError) {
    const details: Record<string, string> = {};
    (err.errors || []).forEach((e: any) => {
        const field = e.path || e.field || (e instanceof Error ? (e as any).path : undefined) || '_';
        // If unique constraint, prefer a clearer message
        if (err instanceof UniqueConstraintError) {
            details[field] = `${field} already exists`;
        } else {
            details[field] = e.message || `${field} is invalid`;
        }
    });
    return details;
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // Joi validation error
    if (err && (err.isJoi || err.name === 'ValidationError') && Array.isArray(err.details)) {
        const details = mapJoiError(err);
        return res.status(400).json({ error: 'Validation failed', details });
    }

    // Sequelize unique constraint / validation errors
    if (err instanceof UniqueConstraintError) {
        const details = mapSequelizeValidation(err);
        return res.status(409).json({ error: 'Unique constraint error', details });
    }

    if (err instanceof SequelizeValidationError) {
        const details = mapSequelizeValidation(err);
        return res.status(400).json({ error: 'Database validation error', details });
    }

    if (err instanceof ForeignKeyConstraintError) {
        // err.fields may be an object or array depending on dialect
        const fields = err.fields || {};
        const keys = Array.isArray(fields) ? fields : Object.keys(fields);
        const details: Record<string, string> = {};
        if (keys.length) {
            keys.forEach((k: string) => (details[k] = `${k} references unknown resource`));
        } else if (err.index) {
            details[err.index] = 'Foreign key constraint violation';
        }
        return res.status(409).json({ error: 'Foreign key constraint error', details });
    }

    // ApiError (custom)
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ error: err.message, details: err.details });
    }

    // Fallback
    // Log the full error for debugging
    // eslint-disable-next-line no-console
    console.error(err && err.stack ? err.stack : err);
    return res.status(500).json({ error: err?.message || 'Internal Server Error' });
}
