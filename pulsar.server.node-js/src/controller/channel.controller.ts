import { NextFunction, Request, Response } from "express";

import * as channelService from "../services/channel.service";

/**
* [POST]
*
*/
export async function postCreateChannel(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.userId;
    const channelName = req.body.channelName;

    const createdChannel = await channelService.createChannel(userId, channelName); 
    res.json(createdChannel);
    return next();
}