import e, { NextFunction, Request, Response } from "express";
import axios from "axios";

import { IDENTITY_URL } from "../configs/secrets";
import { User } from "../authentication/identity-user";
import logger from "../utils/loging";

export async function useAuthentication(req: Request, res: Response, next: NextFunction) {

    const authToken = res.getHeader('Authorization');
    if (authToken != null) {
        try {
            const authResult = await axios.post<User>(`${IDENTITY_URL}/authenticate-server-user`, {token: authToken});
            if (authResult.status === 200 && authResult.data != null) {
                req.user = authResult.data;
            } else {
                req.user = null;
                logger.warn('User token validation failed');
            }
    
        } catch(err) {
            req.user = null;
            logger.error('Request to Identity server failed', err);
        }
    } else {
        req.user = null;
        logger.warn('User token is null | undefined');
    }
    
    
    //console.log(authResult)

    return next();
}

