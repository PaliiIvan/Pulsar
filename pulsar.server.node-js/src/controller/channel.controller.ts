import { NextFunction, Request, Response } from "express";

import * as channelService from "../services/channel.service";
import logger from "../utils/loging";

/**
* [POST]
*
*/
export async function postCreateChannel(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.userId;
    const channelName = req.body.logIn;

    logger.info('Create Channel', {userId, channelName});
    try {
        const createdChannel = await channelService.createChannel(userId, channelName); 
        res.json(createdChannel);
    }
     catch(err) {
         return next(err);
     }

    return next();
}


/**
* [GET]
*
*/
export async function getCurrentChannel(req: Request, res: Response, next: NextFunction) {
   
    const userId = req.user?.id;

    logger.info('Get channel by user id', {userId});

    try {
        const channel = await channelService.getChannelByUserId(userId!);
        res.json(channel);

    } catch(err) {
        return next(err);
    }
    return next();

}

/**
* [POST]
* Initiate new stream
*/
export async function initiateStream(req: Request, res: Response, next: NextFunction) {
    const streamTitle = req.body.title;
    try {
        const res = await channelService.initiateStream(streamTitle, req.user?.id);
    } catch(err) {
        return next(err);
    }
    return next();
}