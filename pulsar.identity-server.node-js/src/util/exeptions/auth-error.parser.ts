import { NextFunction } from "express";
import { Result, ValidationError } from "express-validator";

import { ErrorMetadata } from "../../api.models/server.errors";

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

    metadata: any[] = [];
    description: string;
    statusCode: number;

    constructor(errors: ValidationError[] | { propery: string, message: string }[]) {
        super("Validation Error");

        errors.forEach(error => {
            if ('param' in error)
                this.metadata.push(error.msg);
            else
                this.metadata.push(error);
        });

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