const { validationResult } = require('express-validator');

const authentificationService = require('../services/auth.service');
const { getErrors } = require('../utils/error.formater');


/**
* Post Action method
* @param { Request } req 
* @param { Response } res 
* @param {()} next 
*/
exports.SignUp = async function (req, res, next) {
    var email = req.body.email;
    var login = req.body.login;
    var password = req.body.password;
    var repetPassword = req.body.repetPassword;

    try {

        var authResult = await authentificationService.SignUp(email, login, password, repetPassword);
        res.json({Message: authResult});
        
    } catch (err) {
        next(err);
    }
    
}


/**
* Get Action method
* @param { Request } req 
* @param { Response } res 
* @param {()} next 
*/
exports.CompleteAuth = async function (req, res, next) {
    const userId = req.query.id;
    const userEmailToken = req.query.token;
    await authentificationService.CheckEmail(userId,userEmailToken);
    
}

/**
* Post Action method
* @param { Request } req 
* @param { Response } res 
* @param {()} next 
*/
exports.LogIn = async function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var repeatPassword = req.body.repetPassword;
    const errors = validationResult(req);
    
    if(!errors.isEmpty())
    {
        res.json(getErrors(errors));
    }
    await authentificationService.LogIn();
    next();

}

/**
* Post Action method
* @param { Request } req 
* @param { Response } res 
* @param {()} next 
*/
exports.LogOut = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var repetPassword = req.body.repetPassword;
    return res.json({Message:'LogOut'});
}

/**
* Get Action method
* @param { Request } req 
* @param { Response } res 
* @param {()} next 
*/
exports.CheckToken = async function (req, res, next) {
    var token = req.body.token;
   
}
