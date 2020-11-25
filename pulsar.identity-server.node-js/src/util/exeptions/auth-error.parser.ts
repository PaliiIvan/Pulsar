import { NextFunction } from "express";
import { Result, ValidationError } from "express-validator";

import { ErrorMetadata } from "../../api.models/server.errors";

/**
 * 
 * @param errors Validation Error
 * @param next Next function
 */
export function errorParser(errors: Result, next: NextFunction) {
    const error = new ValidationException(errors.array());
    return next(error);
}

export class ValidationException extends Error implements ErrorMetadata {

    metadata: any;
    description: string;
    statusCode: number;

    constructor(errors: ValidationError[] | { property: string, message: string }[]) {
        super("Validation Error");


        if ('param' in errors[0]) {
            this.metadata = errors[0].msg;
        } else {
            this.metadata = errors[0];
        }
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