import { NextFunction, Request, Response } from 'express';
import { ResponseResult } from '../api.models/response.model';
import { StreamService } from '../services';

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
        res.json(new ResponseResult(createdChannel));
    } catch (err) {
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
    const streamId = req.params.stream;
    let channel;

    logger.info('Get channel by name: ', { channelName });
    try {
        if (streamId) {
            channel = await StreamService.getStream(streamId);
        } else {
            channel = await channelService.getChannel({ channelName: channelName });
        }

        res.json(new ResponseResult(channel));
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
    logger.info('Get channel by user id', { user: req.user?.id });

    try {

        const channel = await channelService.getChannelByUserId(req.user?.id!);
        res.json(new ResponseResult(channel));
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
        res.json(new ResponseResult(channels));
        logger.info('Get online channels - finished');
    } catch (err) {
        return next(err);
    }

    return next();
}
