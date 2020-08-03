import * as Joi from '@hapi/joi';
import * as createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';

export const validateSchema = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
            errors: {
                wrap: {
                    label: ''
                }
            }
        });

        if (error && error.isJoi) {
            return res.status(400).json(createError(400, error.details[0].message));
        }
        next();
    };
};

export * from './users';
