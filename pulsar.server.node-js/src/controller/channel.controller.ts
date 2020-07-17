import { NextFunction, Request, Response } from 'express';

import * as channelService from '../services/channel.service';
import logger from '../utils/loging';

/**
* [POST]
*
*/
export async function postCreateChannel(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.userId;
    const channelName = req.body.logIn;

    logger.info('Create Channel', { userId, channelName });
    try {
        const createdChannel = await channelService.createChannel(userId, channelName);
        res.json(createdChannel);
    }
    catch (err) {
        return next(err);
    }

    return next();
}

/**
* [GET]
*Get channel by name
*/
export async function getChannelByName(req: Request, res: Response, next: NextFunction) {
    const channelName = req.params.name;

    try {
        const channel = await channelService.getChannel({ channelName: channelName });
        res.json(channel);
    } catch (err) {
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

    logger.info('Get channel by user id', { userId });

    try {
        const channel = await channelService.getChannelByUserId(userId!);
        res.json(channel);

    } catch (err) {
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
        await channelService.initiateStream(streamTitle, req.user?.id);
        res.json(null);
    } catch (err) {
        return next(err);
    }
    return next();
}

/**
* [GET]
* Get all online channels
*/
export async function getOnlineChannels(req: Request, res: Response, next: NextFunction) {
    logger.info('Get online channels');
    try {
        const channels = await channelService.getOnlineChannels();
        res.json(channels);
    } catch (err) {
        return next(err);
    }

    return next();
}


/**
* [PUT]
* Finish stream for current channel
*/
export async function putFinishStream(req: Request, res: Response, next: NextFunction) {
    logger.info('Finish stream');

    const userId = req.user?.id;
    if (!userId) {
        return next(new Error('User is undefined'));
    }
    try {
        await channelService.finishStream(userId);
        res.json({});
    } catch (err) {
        return next(err);
    }
    return next();
}