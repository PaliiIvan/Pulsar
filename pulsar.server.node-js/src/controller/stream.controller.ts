import * as StreamServices from "../services/stream.service";
import { NextFunction, Request, Response } from 'express';
import { Comment } from "../api.models/comment";
/**
* [POST]
* Add comment to stream
*/
export async function postComment(req: Request, res: Response, next: NextFunction) {
    try {
        const channelName = req.body.channelName;
        const commentData = req.body.comment;
        const comment = new Comment({ ...commentData });
        await StreamServices.addCommentToStream(channelName, comment);
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
        const comments = await StreamServices.getComments(channelName);
        console.log(channelName);
        res.json(comments);
        return next();
    } catch (err) {
        return next(err);
    }
}