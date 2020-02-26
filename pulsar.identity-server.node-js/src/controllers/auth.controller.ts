import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";


import * as authService from "../services/auth.service";
import { ValidationExeption, errorParser } from "../util/exeptions/authentification.exeption";


//POST
export async function SignUp(req: Request, res: Response, next: NextFunction) {
    var errors = validationResult(req);
    if(!errors.isEmpty()) {
        return errorParser(errors, next);
    }

    const email = req.body.email;
    const login = req.body.login;
    const password = req.body.password;

    try {
        const authResult = await authService.SignUp(email, login, password);
        res.json(authResult);
    } catch (err) {
        return next(err);
    }

}

//GET
export async function CompleteAuth(req: Request, res: Response, next: NextFunction) {
    const userId = req.query.id;
    const userEmailToken = req.query.token;
    let confirmationEmailResult: any;

    try {
        const confirmationEmailResult = await authService.CheckEmail(userId, userEmailToken);
    } catch(err) {
        return next(err);
    }

    res.redirect("http://localhost:3000");
}

//POST
export async function LogIn(req: Request, res: Response, next: NextFunction) {
    var errors = validationResult(req);
    if(!errors.isEmpty()) {
        return errorParser(errors, next);
    }

    const email = req.body.email;
    const password = req.body.password;
 
    try {
        const logInResult = await authService.LogIn(email, password);
        res.json(logInResult);
    } catch(err) {
        return next(err);
    }
}

//POST
export async function CheckUserToken(req: Request, res: Response, next: NextFunction) {
    const token = req.body.token;
    const userId = req.body.id;

    const checkTokenResult = authService.CheckUserToken(userId, token);

    res.json(checkTokenResult);
}

