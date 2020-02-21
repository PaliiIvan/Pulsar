
const {check} = require('express-validator');

const userRepo = require('./user.repository');
class ErrorMessage {
    constructor(property, message) {
        this.property = property;
        this.message = message;
    }
}
const signUpValidation = [
    check('email')
    .isEmail()
    .custom( async (login) =>  {
        const user = await userRepo.FindOne({login: login});
        if(user !== null) {
            return false;
        }
        return true;
    }).withMessage('E-mail already in use'),

    check('login')
    .notEmpty()
    .isLength({min: 3, max: 30})
    .custom(login => Number.isInteger(login[0]))
    .custom( async (login) => {
        const user = await userRepo.FindOne({login: login});
        if(user !== null) {
            return false;
        }
        return true;
    }).withMessage('Login already in use'),

    check('password')
    .notEmpty()
    .isLength({min: 8, max: 20})
    .trim()
    .custom((value, {req}) => {
        if(value !== req.body.repetPassword) {
            return false;
        }
        return true;
    }).withMessage('Password confirmation does not match password')
]

const logInValidation = [

    check('email')
    .isEmail().
    withMessage(new ErrorMessage('email', 'Email validation failed')),

    check('login')
    .notEmpty()
        .withMessage(new ErrorMessage('login', 'Login is Empty'))
    .isLength({min: 3, max: 30})
        .withMessage(new ErrorMessage('login', 'Login lenght should be: min: 3, max: 30 characters'))
    .custom(login => Number.isInteger(login[0]))
        .withMessage(new ErrorMessage('login', 'Login should start with leter')),

    check('password')
    .notEmpty().withMessage(new ErrorMessage('login', 'Password is empty'))
    .isLength({min: 8, max: 20})
    .trim()
]

module.exports = {
    SignUpValidation: signUpValidation,
    LoginValidation: logInValidation
}

