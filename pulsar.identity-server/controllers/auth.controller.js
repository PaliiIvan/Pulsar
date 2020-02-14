const user = require('../entities/user/user.model');
const authentificationService = require('../services/auth.service');

/**
* Post Action method
* @param { Request } req 
* @param { Response } res 
* @param {()} next 
*/
exports.SignIn = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var repeatPassword = req.body.repetPassword;


}

/**
* Post Action method
* @param { Request } req 
* @param { Response } res 
* @param {()} next 
*/
exports.SignOut = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var repetPassword = req.body.repetPassword;
}

/**
* Post Action method
* @param { Request } req 
* @param { Response } res 
* @param {()} next 
*/
exports.CreateAccount = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var repetPassword = req.body.repetPassword;

    authentificationService.CreateAcount(email, password, repetPassword);
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
