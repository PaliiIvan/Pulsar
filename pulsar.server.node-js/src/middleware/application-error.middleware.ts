import { Request, Response } from 'express';
import logger from '../utils/loging';
import { UnAuthorizedError, NotFoundError } from '../utils/errors/server.errors';
import os from 'os';
export function errorHandling(err: any, req: Request, res: Response, next: any) {
    logger.error('', err);
    logger.error('Url');

    if (err instanceof UnAuthorizedError) {
        res.status(403).json(err);
        return next();
    }

    if (err instanceof NotFoundError) {
        res.status(404).json(err);
        return next();
    }

    res.status(500).json({
        message: 'Server Error'
    });
    return next();
}