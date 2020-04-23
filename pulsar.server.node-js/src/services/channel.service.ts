import * as channelRepo from "../features/channel/channel.repository";
import jwt from "jsonwebtoken"
import { STREAM_SECRET_KEY } from "../configs/secrets";

export async function createChannel(userId: string, channelName: string) {
    const streamToken = generateStreamToken(userId, channelName);
    const result = await channelRepo.createChannel(userId, channelName, streamToken);
    return result;
}


export async function getChannelByUserId(userId: string) {
    const channel = await channelRepo.getChannelByUserId(userId);
    return channel;
}



/**
 * This method generate new Stream token that include User Id and Channel Name
 * @param userId User Id
 * @param channelName User login is channel Name
 * @returns Generated token
 */
function generateStreamToken(userId: string, channelName: string) {
    const streamToken = jwt.sign({userId, channelName}, STREAM_SECRET_KEY!);
    return streamToken;
}