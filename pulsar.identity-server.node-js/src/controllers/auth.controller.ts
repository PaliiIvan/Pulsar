import  { validationResult }  from "express-validator";
import { Request, Response } from "express";
import { SignUp as SignUpService, CheckEmail, LogIn as LoginSercive } from "../services/auth.service";
import { getErrors } from "../util/error.formater";
import { NextFunction } from "express";


export async function SignUp (req: any, res: any, next: any) {
    const email = req.body.email;
    const login = req.body.login;
    const password = req.body.password;
    const repetPassword = req.body.repetPassword;

    try {

        const authResult = await SignUpService(email, login, password);
        res.json({Message: authResult});
        
    } catch (err) {
        next(err);
    }
    
}


export async function CompleteAuth (req: Request, res: Response, next: NextFunction) {
    const userId = req.query.id;
    const userEmailToken = req.query.token;
    await CheckEmail(userId,userEmailToken);
    
}


export async function LogIn (req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    const password = req.body.password;
    const repeatPassword = req.body.repetPassword;
    const errors = validationResult(req);
    
    if(!errors.isEmpty())
    {
        res.json(getErrors(errors));
    }
   
    next();

}


export function LogOut (req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    const password = req.body.password;
    const repetPassword = req.body.repetPassword;
    return res.json({Message:"LogOut"});
}


export async function CheckToken (req: Request, res: Response, next: NextFunction) {
    const token = req.body.token;
   
}

