import { ValidationExeption } from "../exeptions/authentification.exeption";
import { NextFunction } from "express";
import { Result } from "express-validator";

/**
 * 
 * @param errors Validation Error
 * @param next Next function
 */
export function errorParser(errors: Result, next: NextFunction) {
    const error = new  ValidationExeption(errors.array());
    return next(error);
}