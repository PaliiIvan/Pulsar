import { Request, Response } from "express";
import { Result, ValidationError } from "express-validator";
import { ValidationExeption } from "../util/exeptions/authentification.exeption";

export function errorHandling(err: any, req: Request, res: Response, next: any) {
    
    if(err instanceof (ValidationExeption)) {
        const validationError = <ValidationExeption>err;
        
        res.status(400).json({
            message: "Validation Filed",
            errors: validationError.errors
        })
        return next();
    }

    return next();
}
