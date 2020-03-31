import { NextFunction, Request, Response } from "express";

import * as channelService from "../services/channel.service";

/**
* [POST]
*
*/
export async function postCreateChannel(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.userId;
    const login = req.body.logIn;

    const createdChannel = await channelService.createChannel(userId, login); 
    res.json(createdChannel);
    return next();
}