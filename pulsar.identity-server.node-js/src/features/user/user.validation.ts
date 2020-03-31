
import { check } from "express-validator";

import { findOne } from "./user.repository";
import { ValidationErrorMessage } from "../../util/exeptions/auth-error.parser";



const signUpValidation = [
    check("email")
        .isEmail()
            .withMessage(new ValidationErrorMessage("email", "Email validation failed"))
        .custom(async (email) => {
             const user = await findOne({ email: email });
            if (user != null) {
                return Promise.reject();
            }
        }).withMessage(new ValidationErrorMessage("email", "E-mail already in use")),

    check("login")
        .not().isEmpty()
            .withMessage(new ValidationErrorMessage("login", "Login is Empty"))
        .isLength({ min: 3, max: 30 })
            .withMessage(new ValidationErrorMessage("login", "Login lenght should be: min: 3, max: 30 characters"))
        .custom(login => {
            if(login != null)
                return !Number.isInteger(login[0]);})
            .withMessage(new ValidationErrorMessage("login", "Login should start with leter"))
        .custom(async (login) => {
            const user = await findOne({ login: login });
            if (user != null) {
                return Promise.reject();
            }
            }).withMessage(new ValidationErrorMessage("login", "Login already in use")),

    check("password")
        .not().isEmpty()
            .withMessage(new ValidationErrorMessage("password", "Password is Empty"))
        .isLength({ min: 8, max: 20 })
            .withMessage(new ValidationErrorMessage("password", "Password lenght should be: min: 3, max: 30 characters"))
        .trim()
        .custom((value, { req }) => {
            if (value === req.body.repeatPassword) {
                return true;
            }
            return false;
        })
            .withMessage(new ValidationErrorMessage("password", "Password confirmation does not match password"))
];

const logInValidation = [

    check("email")
    .isEmail()
        .withMessage(new ValidationErrorMessage("email", "Email validation failed")),

    check("password")
    .not().isEmpty()
        .withMessage(new ValidationErrorMessage("password", "Password is empty"))
];

export const SignUpValidation = signUpValidation;
export const LoginValidation = logInValidation;

