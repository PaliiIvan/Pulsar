import { NextFunction } from "express";
import { Result, ValidationError } from "express-validator";

/**
 * 
 * @param errors Validation Error
 * @param next Next function
 */
export function errorParser(errors: Result, next: NextFunction) {
    const error = new ValidationExeption(errors.array());
    return next(error);
}

export class ValidationExeption {
    errors: ValidationErrorMessage[];
    constructor(errors: ValidationError[]) {
        this.errors = errors.map(err => err.msg);
    }
}

export class ValidationErrorMessage {

    property: string;
    message: string

    constructor(property: string, message: string) {
        this.property = property;
        this.message = message;
    }
}