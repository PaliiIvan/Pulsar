import * as channelRepo from '../features/channel/channel.repository';
import * as streamRepo from '../features/stream/stream.repository';
import jwt from 'jsonwebtoken';
import { STREAM_SECRET_KEY } from '../configs/secrets';
import logger from '../utils/loging';
import { ChannelPreview } from '../api.models/channel-preview';
import { NotFoundError } from '../utils/errors/server.errors';

export async function createChannel(userId: string, channelName: string) {
    const streamToken = generateStreamToken(userId, channelName);
    const result = await channelRepo.createChannel(
        userId,
        channelName,
        streamToken
    );
    return result;
}

export async function getChannelByUserId(userId: string) {
    const channel = await channelRepo.getChannelByUserId(userId);
    const streamServer = 'https://localhost:5001/';
    const streamFormat = '.m3u8';
    channel.streamToken = `${streamServer}${channel.streamToken}${streamFormat}`;
    return channel;
}

export async function initiateStream(streamTitile: string, userId?: string) {
    const stream = await streamRepo.createStream({ title: streamTitile });
    const channel = await channelRepo.getChannelByUserId(userId);

    channel.currentStream = stream;
    channel.pending = true;

    const result = await channelRepo.updateChannel(channel);
}

export async function getOnlineChannels() {
    const onlineChannels = await channelRepo.getChannels({
        isOnline: true,
        currentStream: { $ne: null },
    });
    const streamsPreview = onlineChannels.map((channel) => {
        if (channel.currentStream) {
            return new ChannelPreview(
                channel.id,
                channel.channelName,
                channel.currentStream.title,
                channel.currentStream.id
            );
        }
    });
    return streamsPreview;
}

export async function getChannel(query: any) {
    logger.info(query);
    const channel = await channelRepo.getChannel(query);
    const streamServer = 'https://localhost:5001/';

    if (channel == null || channel.currentStream == null) {
        throw new NotFoundError('Channel stream not found');
    }

    channel.currentStream.locationPath = `${streamServer}${channel?.currentStream?.locationPath}`;

    const channelDto = {
        isOnline: channel?.isOnline,
        channelName: channel?.channelName,
        currentStream: channel?.currentStream,
    };

    return channelDto;
}

export async function finishStream(userId: string) {
    const channel = await channelRepo.getChannel({ userId: userId });

    if (channel == null) {
        throw new NotFoundError('Channel not found');
    }

    channel.pending = false;
    channel.isOnline = false;
    channel.currentStream = null;
    await channelRepo.updateChannel(channel);
}
/**
 * This method generate new Stream token that include User Id and Channel Name
 * @param userId User Id
 * @param channelName User login is channel Name
 * @returns Generated token
 */
function generateStreamToken(userId: string, channelName: string) {
    const streamToken = jwt.sign({ userId, channelName }, STREAM_SECRET_KEY!);
    return streamToken + '__';
}
