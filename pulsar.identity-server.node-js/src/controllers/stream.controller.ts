import { Request, Response, NextFunction } from "express";

import { ResponceResult } from "../api.models/responce.model";
import logger from "../util/logger";
import { generateStreamKey } from "../services/stream.service";
/**
* [GET]
*
*/
export async function getGenerateStreamKey(req: Request, res: Response, next: NextFunction) {
    logger.info("Generate stream key");
    
    const userId = req.query.userId;
    
    try {    
        const streamKey = await generateStreamKey(userId);

        return res.json(new ResponceResult("Stream key", {key: streamKey}));
    } catch (err) {
        logger.error("Server Error", {userId});
        return next(err);
    }



}