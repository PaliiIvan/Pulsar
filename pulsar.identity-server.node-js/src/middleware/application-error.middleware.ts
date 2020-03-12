import { Request, Response } from "express";
import logger from "../util/logger";
import { NotFoundError, ErrorResponce, ServerError, NotAuthorizeError } from "../util/exeptions/server-errors";
import { ValidationExeption } from "../util/exeptions/auth-error.parser";


export function errorHandling(err: any, req: Request, res: Response, next: any) {
    
    if(err instanceof (ValidationExeption)) {
        logger.error("ViewModel validation filed", err);
        res.status(400).json(new ErrorResponce("Validation filed", err.errors));
        return next();
    }

    if(err instanceof (NotFoundError)) {
        logger.error("Resource not found error", err);
        res.status(404).json(new ErrorResponce(err.message, err.metadata));
        return next();
    }

    if(err instanceof (ServerError)) {
        logger.error("Server Error", err);
        res.status(500).json(new ErrorResponce(err.message, err.metadata));
        return next();
    }

    if(err instanceof (NotAuthorizeError)) {
        logger.error("User is not Authorize", err);
        res.status(401).json(new ErrorResponce(err.message, err.metadata));
        return next();
    }

    logger.error("Inner server error", err);
    res.status(500).json(new ErrorResponce("Server error"));
    return next();
}
