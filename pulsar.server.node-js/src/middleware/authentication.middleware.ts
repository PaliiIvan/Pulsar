import { NextFunction, Request, Response } from "express";
import axios from "axios";

import * as secrets from "../configs/secrets";
import { User } from "../authentication/identity-user";
import { UnAuthorizedError } from "../utils/errors/server.errors";

import logger from "../utils/loging";
import * as authContext from "../authentication/authorization-context";

export async function useAuthentication(req: Request, res: Response, next: NextFunction) {

    const authToken = req.get('Authorization');

    if (authToken != null) {
        try {
            const authResult = await axios.post(`${secrets.IDENTITY_URL}/authenticate-server-user`, { token: authToken })

            if (authResult.status === 200 && authResult.data != null) {
                req.user = authResult.data.data;
                authContext.setUser(authResult.data);
                logger.info('User checked', authResult.data);
            } else {
                req.user = null;
                logger.warn('User token validation failed');
                throw new UnAuthorizedError();
            }
            return next();

        } catch (err) {
            req.user = null;
            logger.error('Request to Identity server failed  ', err);
            return next(new UnAuthorizedError())
        }
    } else {
        req.user = null;
        logger.warn('User token is null | undefined');
        return next();
    }


    //console.log(authResult)
}

