import { NextFunction } from "express";
import { Result, ValidationError } from "express-validator";

import { ErrorMetadata } from "./server-errors";

/**
 * 
 * @param errors Validation Error
 * @param next Next function
 */
export function errorParser(errors: Result, next: NextFunction) {
    const error = new ValidationExeption(errors.array());
    return next(error);
}

export class ValidationExeption extends Error implements ErrorMetadata {

    constructor(errors: ValidationError[] | { propery: string, message: string }[]) {
        super("Validation Error");

        if('param' in errors)
            this.metadata = (<ValidationError[]>errors).map(err => err.msg);
        else
            this.metadata = errors;
    }

    metadata: any;
    description: string;
    statusCode: number;
}

export class ValidationErrorMessage {

    property: string;
    message: string

    constructor(property: string, message: string) {
        this.property = property;
        this.message = message;
    }
}