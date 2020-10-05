import { StreamService, ChannelService } from '../services';
import { NextFunction, Request, Response } from 'express';
import { Comment } from '../api.models/comment';
import logger from '../utils/loging';
/**
 * [POST]
 * Add comment to stream
 */
export async function postComment(req: Request, res: Response, next: NextFunction) {
    try {
        const channelName = req.body.channelName;
        const commentData = req.body.comment;
        const comment = new Comment({ ...commentData });
        await StreamService.addCommentToStream(channelName, comment);
        res.json(null).status(200);
        return next();
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

/**
 * [GET]
 * Get Stream comments
 */
export async function getComment(req: Request, res: Response, next: NextFunction) {
    const channelName = req.params.channelName;
    try {
        const comments = await StreamService.getComments(channelName);

        res.json(comments);
        return next();
    } catch (err) {
        return next(err);
    }
}

/**
 * [POST]
 * Initiate new stream
 */
export async function initiateStream(req: Request, res: Response, next: NextFunction) {
    const streamTitle = req.body.title;
    try {
        await StreamService.initiateStream(streamTitle, req.user?.id);
        res.json(null);
    } catch (err) {
        return next(err);
    }
    return next();
}

/**
 * [PUT]
 * Finish stream for current channel
 */
export async function postFinishStream(req: Request, res: Response, next: NextFunction) {
    logger.info('Finish stream');
    const userId = req.user?.id;
    const save = req.body.save;
    if (!userId) {
        return next(new Error('User is undefined'));
    }
    try {
        await StreamService.finishStream(userId, save);
        res.json({});
    } catch (err) {
        return next(err);
    }
    return next();
}

/**
 * [GET]
 * Get all saved streams
 */
export async function getAllStreams(req: Request, res: Response, next: NextFunction) {
    logger.info('Get all streams action started');

    try {
        const streams = await StreamService.getSavedStreams();
        res.json(streams);
    } catch (err) {
        return next(err);
    }
    return next();
}
