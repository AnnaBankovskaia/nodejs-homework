import { NextFunction, Request, Response } from 'express';
import * as createError from 'http-errors';
import { UserService } from '../services';

const userService = new UserService();

export const doesUserExist = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!userService.getUser(id)) return res.status(404).json(createError(404, 'The user was not found'));
    next();
};
