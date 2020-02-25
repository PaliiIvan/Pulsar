import { ValidationError } from "express-validator";

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
