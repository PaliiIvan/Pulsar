import { Request, Response } from "express";
import { NotFoundError, ServerError, NotAuthorizeError } from "../api.models/server.errors";
import { ResponseResult } from "../api.models";
import { ValidationException } from "../util/exeptions/auth-error.parser";
import logger from "../util/logger";


export function errorHandling(err: any, req: Request, res: Response, next: any) {

    logger.error(err.message ?? 'Unexpected server error', [err.metadata, err.stack]);

    if (err instanceof (ValidationException)) {

        res.status(400).json(new ResponseResult(err.metadata, false, "Validation filed"));
        return next();
    }

    if (err instanceof (NotFoundError)) {

        res.status(404).json(new ResponseResult(err.metadata, false, err.message));
        return next();
    }

    if (err instanceof (ServerError)) {

        res.status(500).json(new ResponseResult(err.metadata, false, err.message));
        return next();
    }

    if (err instanceof (NotAuthorizeError)) {

        res.status(401).json(new ResponseResult(err.metadata, false, err.message));
        return next();
    }

    res.status(500).json(new ResponseResult(null, false, "Server error"));
    return next();
}
