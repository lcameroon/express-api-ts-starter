import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

import { UserService } from './users.service';
import validate from '../../utils/validate';

const SCHEMA = {
    name: Joi.string().label('Name').max(90).required()
};

/**
 * Validate create/update user request.
 *
 */
export const userValidator = (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    return validate(req.body, SCHEMA).then(() => next()).catch(err => next(err));
};

/**
 * Validate users existence.
 */
export const findUser = (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    return UserService.getById(req.params.id)
        .then(() => {
            next();
            return null;
        })
        .catch(err => next(err));
};
