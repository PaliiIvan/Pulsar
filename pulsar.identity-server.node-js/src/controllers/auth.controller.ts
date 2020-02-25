import { Request, Response } from "express";
import { validationResult } from "express-validator";


import * as authService from "../services/auth.service";
import { ValidationExeption } from "../util/exeptions/authentification.exeption";

export async function SignUp(req: any, res: any, next: any) {


    const email = req.body.email;
    const login = req.body.login;
    const password = req.body.password;

    try {
        const authResult = await authService.SignUp(email, login, password);
        res.json({ Message: authResult });
    } catch (err) {
        next(err);
    }

}


export async function CompleteAuth(req: Request, res: Response, next: any) {
    const userId = req.query.id;
    const userEmailToken = req.query.token;
    let confirmationEmailResult: any;

    try {
        confirmationEmailResult = await authService.CheckEmail(userId, userEmailToken);
    } catch(err) {
        next(err);
    }

    res.json(confirmationEmailResult);
}


export async function LogIn(req: Request, res: Response, next: any) {

    var errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new  ValidationExeption(errors.array())
        return next(error);
    }

    const email = req.body.email;
    const password = req.body.password;

    let logInResult: any;  
    try {
        logInResult = await authService.LogIn(email, password);
        res.json(logInResult);
    } catch(err) {
        return next(err);
    }
}


export function LogOut(req: Request, res: Response, next: any) {
    const email = req.body.email;
    const password = req.body.password;
    const repetPassword = req.body.repetPassword;
    return res.json({ Message: "LogOut" });
}


export async function CheckToken(req: Request, res: Response, next: any) {
    const token = req.body.token;
    const userId = req.body.id;
}

