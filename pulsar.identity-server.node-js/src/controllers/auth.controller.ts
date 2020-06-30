import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";


import * as authService from "../services/auth.service";
import { constants } from "../configs/global.variables";
import { errorParser } from "../util/exeptions/auth-error.parser";
import { ResponceResult } from "../api.models/responce.model";
import { User } from "../api.models/user.model";

//POST
export async function signUp(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
    const userId = req.body.id;
    const userEmailToken = req.body.token;
    let confirmationEmailResult: any;

    try {
        const confirmationEmailResult = await authService.checkEmail(userId, userEmailToken);
        res.json(confirmationEmailResult);
    } catch (err) {
        return next(err);
    }
}

//POST
export async function logIn(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorParser(errors, next);
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
        const logInResult = await authService.logIn(email, password);

        res.json(logInResult);
    } catch (err) {
        return next(err);
    }
}

//POST
export async function checkUserToken(req: Request, res: Response, next: NextFunction) {
    const token = req.body.token;

    try {
        const checkTokenResult = await authService.checkUserToken(token);
        res.json(checkTokenResult);
    } catch (err) {
        return next(err);
    }
}

//POST
export async function regenerateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.body.token;

    try {
        const tokenRegenerationResult = await authService.regenerateToken(token)
        res.json(tokenRegenerationResult);
    } catch (err) {
        return next(err);
    }
}

/**
* [POST]
* Check if token from api is valid and send User data
*/
export async function postCheckApiToken(req: Request, res: Response, next: NextFunction) {
    const token = req.body.token;

    try {
        const user = await authService.authApiRequest(token);
        res.json(new User(user.id, user.email, user.login));
    } catch (err) {
        return next(err);
    }
}

//GET
//TODO: Not implemented
export async function initiateChangePassword(req: Request, res: Response, next: NextFunction) {

    const userEmail = req.params.email;

    const initiateChangePasswordResult = authService.initiateChangePassword(userEmail);
}