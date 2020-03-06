import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";


import * as authService from "../services/auth.service";
import { errorParser } from "../util/exeptions/authentification.exeption";
import { constants } from "../configs/global.variables";

//POST
export async function signUp(req: Request, res: Response, next: NextFunction) {
    var errors = validationResult(req);
    if(!errors.isEmpty()) {
        return errorParser(errors, next);
    }

    const email = req.body.email;
    const login = req.body.login;
    const password = req.body.password;

    try {
        const authResult = await authService.signUp(email, login, password);
        res.json(authResult);
    } catch (err) {
        return next(err);
    }

}

//GET
export async function completeAuth(req: Request, res: Response, next: NextFunction) {
    const userId = req.query.id;
    const userEmailToken = req.query.token;
    let confirmationEmailResult: any;

    try {
        const confirmationEmailResult = await authService.checkEmail(userId, userEmailToken);
        res.redirect(constants.CLIENT_URL);
    } catch(err) {
        return next(err);
    }
}

//POST
export async function logIn(req: Request, res: Response, next: NextFunction) {
    var errors = validationResult(req);
    if(!errors.isEmpty()) {
        return errorParser(errors, next);
    }

    const email = req.body.email;
    const password = req.body.password;
 
    try {
        const logInResult = await authService.logIn(email, password);
        res.json(logInResult);
    } catch(err) {
        return next(err);
    }
}

//POST
export async function checkUserToken(req: Request, res: Response, next: NextFunction) {
    const token = req.body.token;
    const userId = req.body.id;
    let checkTokenResult: any;

    try {
        checkTokenResult = authService.checkUserToken(userId, token);
        res.json(checkTokenResult);
    } catch(err) {
        return next(err);
    }
}

//GET
//TODO: Not implemented
export async function initiateChangePassword(req: Request, res: Response, next: NextFunction) {
    const userEmail = req.params.email;

    const initiateChangePasswordResult = authService.InitiateChangePassword(userEmail);
}