import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

import logger from '../utils/logger';
import buildError from '../utils/buildError';

export const notFound = (req: Request, res: Response): void => {
    res.status(HttpStatus.NOT_FOUND).json({
        error: {
            code: HttpStatus.NOT_FOUND,
            message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
        }
    });
};

export const methodNotAllowed = (req: Request, res: Response) => {
    res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
        error: {
            code: HttpStatus.METHOD_NOT_ALLOWED,
            message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED)
        }
    });
};

export const bodyParser = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);

    res.status(err.status).json({
        error: {
            code: err.status,
            message: HttpStatus.getStatusText(err.status)
        }
    });
};

export const genericErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(err.stack);

    let error = buildError(err);
    res.status(error.code).json({ error });
};
