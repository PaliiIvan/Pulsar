import { Request, Response } from "express";
import { ValidationExeption } from "../util/exeptions/authentification.exeption";

export function errorHandling(err: any, req: Request, res: Response, next: any) {
    
    if(err instanceof (ValidationExeption)) {
        res.status(400).json({
            message: "Validation Filed",
            errors: err.errors,
            isSuccess: false
        })
        return next();
    }

    res.status(500).json({
        message: err.message,
        isSuccess: false,
    })
    return next();
}
