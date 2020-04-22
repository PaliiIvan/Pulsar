import { User } from "./identity-user";
import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError } from "../utils/errors/server.errors";

let currentUser: User;

export function setUser(user: User) {
    currentUser = user;
}

export function getUser() {
    return currentUser;
}


export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    if (req.user == null) {
        throw new UnAuthorizedError();
    }

    return next();
}

