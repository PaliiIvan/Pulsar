
import { check } from "express-validator";

import { FindOne } from "./user.repository";


class ErrorMessage {

    property: string;
    message: string

    constructor(property: string, message: string) {
        this.property = property;
        this.message = message;
    }
}
const signUpValidation = [
    check("email")
        .isEmail()
        .custom(async (login) => {
            const user = await FindOne({ login: login });
            if (user !== null) {
                return false;
            }
            return true;
        }).withMessage("E-mail already in use"),

    check("login")
    .isEmpty()
    .isLength({ min: 3, max: 30 })
        .custom(login => Number.isInteger(login[0]))
        .custom(async (login) => {
            const user = await FindOne({ login: login });
            if (user !== null) {
                return false;
            }
            return true;
        }).withMessage("Login already in use"),

    check("password")
    .isEmpty()
        .isLength({ min: 8, max: 20 })
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.repetPassword) {
                return false;
            }
            return true;
        }).withMessage("Password confirmation does not match password")
];

const logInValidation = [

    check("email")
        .isEmail().
        withMessage(new ErrorMessage("email", "Email validation failed")),

    check("login")
    .isEmpty()
        .withMessage(new ErrorMessage("login", "Login is Empty"))
        .isLength({ min: 3, max: 30 })
        .withMessage(new ErrorMessage("login", "Login lenght should be: min: 3, max: 30 characters"))
        .custom(login => Number.isInteger(login[0]))
        .withMessage(new ErrorMessage("login", "Login should start with leter")),

    check("password")
    .isEmpty().withMessage(new ErrorMessage("login", "Password is empty"))
        .isLength({ min: 8, max: 20 })
        .trim()
];

export const SignUpValidation = signUpValidation;
export const LoginValidation = logInValidation;

