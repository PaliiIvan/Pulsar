
import { check } from 'express-validator';

import { FindOne } from './user.repository';


class ErrorMessage {

    property: string;
    message: string

    constructor(property: string, message: string) {
        this.property = property;
        this.message = message;
    }
}
const signUpValidation = [
    check('email')
        .isEmail()
            .withMessage(new ErrorMessage('email', 'Email validation failed'))
        .custom(async (email) => {
            const user = await FindOne({ email: email });
            if (user == null) {
                return true;
            }
            return false;
        }).withMessage(new ErrorMessage('email', 'E-mail already in use')),

    check('login')
        .not().isEmpty()
            .withMessage(new ErrorMessage('login', 'Login is Empty'))
        .isLength({ min: 3, max: 30 })
            .withMessage(new ErrorMessage('login', 'Login lenght should be: min: 3, max: 30 characters'))
        .custom(login => !Number.isInteger(login[0]))
            .withMessage(new ErrorMessage('login', 'Login should start with leter'))
        .custom(async (login) => {
            const user = await FindOne({ login: login });
            if (user == null) {
                return true;
            }
            return false;
            }).withMessage(new ErrorMessage('login', 'Login already in use')),

    check('password')
        .not().isEmpty()
            .withMessage(new ErrorMessage('password', 'Password is Empty'))
        .isLength({ min: 8, max: 20 })
        .trim()
        .custom((value, { req }) => {
            if (value === req.body.repetPassword) {
                return true;
            }
            return false;
            }).withMessage(new ErrorMessage('password', 'Password confirmation does not match password'))
];

const logInValidation = [

    check('email')
    .isEmail()
        .withMessage(new ErrorMessage('email', 'Email validation failed')),

    check('login')
    .not().isEmpty()
        .withMessage(new ErrorMessage('login', 'Login is Empty')) ,

    check('password')
    .not().isEmpty()
        .withMessage(new ErrorMessage('paww', 'Password is empty'))
    .trim()
];

export const SignUpValidation = signUpValidation;
export const LoginValidation = logInValidation;

