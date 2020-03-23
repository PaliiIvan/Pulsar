import { Request, Response } from "express";
import logger from "../util/logger";
import { NotFoundError, ErrorResponce, ServerError, NotAuthorizeError } from "../util/exeptions/server-errors";
import { ValidationExeption } from "../util/exeptions/auth-error.parser";


export function errorHandling(err: any, req: Request, res: Response, next: any) {
    
    if(err instanceof (ValidationExeption)) {
        res.status(400).json(new ErrorResponce("Validation filed", err.errors));
        return next();
    }

    if(err instanceof (NotFoundError)) {
        res.status(404).json(new ErrorResponce(err.message, err.metadata));
        return next();
    }

    if(err instanceof (ServerError)) {
        res.status(500).json(new ErrorResponce(err.message, err.metadata));
        return next();
    }

    if(err instanceof (NotAuthorizeError)) {
        res.status(401).json(new ErrorResponce(err.message, err.metadata));
        return next();
    }

    logger.error("Unexpected server error  ", err);
    res.status(500).json(new ErrorResponce("Server error"));
    return next();
}
