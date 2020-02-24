import { Result, ValidationError } from "express-validator";

/**
 * 
 * @param {Result<ValidationError>} params 
 */
export function getErrors(errors: Result<ValidationError>) {
    return errors.array().map(err  => err.msg);
}

