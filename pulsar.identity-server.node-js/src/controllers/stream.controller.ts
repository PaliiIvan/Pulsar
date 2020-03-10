import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import * as userRepo from "../features/user/user.repository";
import { NotFoundError } from "../util/exeptions/server-errors";
import { STREAM_SECRET_KEY } from "../configs/secrets";
import { ResponceResult } from "../api.models/responce.model";
import logger from "../util/logger";

/**
* [GET]
*
*/
export async function getGenerateStreamKey(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.Id;
    logger.info("Generate stream key");

    try {
        const user = await userRepo.getUserById(userId);
        if(user == null)
            throw new NotFoundError("User not found", {userId: userId});
        
        const streamKey = jwt.sign({userId: userId}, STREAM_SECRET_KEY);

        return res.json(new ResponceResult("Stream key", {key: streamKey}));

    } catch (err) {
        logger.error("Server Error", {userId});
        return next(err);
    }



}