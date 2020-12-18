import * as channelRepo from '../features/channel/channel.repository';
import { ChannelPreview } from '../api.models/channel-preview';
import { NotFoundError } from '../utils/errors/server.errors';
import * as uuid from 'uuid';
import * as secrets from '../configs/secrets';

export async function createChannel(userId: string, channelName: string) {
    const streamToken = uuid.v1() + '__';
    const result = await channelRepo.createChannel(userId, channelName, streamToken);
    return result;
}

export async function getChannelByUserId(userId: string) {
    const channel = await channelRepo.getChannelByUserId(userId);
    const streamServer = secrets.STREAM_SERVER_URL;
    const streamFormat = '.m3u8';

    channel.streamToken = `${streamServer}/${channel.streamToken}${streamFormat}`;
    return channel;
}

export async function getOnlineChannels() {
    const onlineChannels = await channelRepo.getChannels({
        isOnline: true,
        currentStream: { $ne: null },
    });
    const streamServer = `${secrets.STREAM_SERVER_URL}/online/`;
    const streamsPreview = onlineChannels.map((channel) => {
        if (channel.currentStream) {
            return new ChannelPreview(
                channel.id,
                channel.channelName,
                channel.currentStream.title,
                channel.currentStream.id,
                `${streamServer}${channel.currentStream.previewImage}`
            );
        }
    });
    return streamsPreview;
}

export async function getChannel(query: any) {
    const channel = await channelRepo.getChannel(query);
    const streamServer = `${secrets.STREAM_SERVER_URL}/online/`;

    if (channel == null) {
        throw new NotFoundError('Channel not found');
    }

    if (channel.currentStream) {
        channel.currentStream.locationPath = `${streamServer}${channel?.currentStream?.locationPath}`;
    }

    const channelDto = {
        isOnline: channel?.isOnline,
        channelName: channel?.channelName,
        currentStream: channel?.currentStream,
    };

    return channelDto;
}
