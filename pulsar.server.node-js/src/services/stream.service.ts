import { channelSchema } from '../features/channel/channel.schema';
import { Comment } from '../api.models/comment';
import { SocketService, ChannelService } from '../services';
import axios, { AxiosResponse } from 'axios';
import { STREM_SERVER_URL } from '../configs/secrets';
import { StreamServiceResponce } from '../api.models';
import * as streamRepo from '../features/stream/stream.repository';
import * as channelRepo from '../features/channel/channel.repository';
import { NotFoundError } from '../utils/errors/server.errors';
import { Types } from 'mongoose';
import { Channel } from '../features/channel/channel.model';
import { StreamSchema } from '../features/stream/stream.schema';

export async function initiateStream(streamTitile: string, userId?: string) {
    if (!userId) throw Error('UserId null');

    const channel = await ChannelService.getChannelByUserId(userId);

    const stream = new StreamSchema({
        title: streamTitile,
        id: Types.ObjectId(),
        channelId: channel.id,
    });

    channel.pending = true;
    channel.currentStream = stream;

    const result = await channelRepo.updateChannel(channel);
}

export async function addCommentToStream(channelName: string, commentData: Comment) {
    const channel = await channelSchema.findOne({ channelName: channelName });
    let streamDuration: number;

    if (!channel?.currentStream?.startDate?.getTime()) {
        throw Error('No stream time');
    }
    streamDuration = Date.now() - channel.currentStream.startDate.getTime();

    commentData.streamDuration = channel.currentStream.startDate.getTime() + streamDuration;
    channel.currentStream.comments?.push(commentData);
    SocketService.sendComments(channelName, commentData);
    channel.save();
}

export async function getComments(channelName: string) {
    SocketService.createChatRoom(channelName);
    const channel = await channelSchema.findOne({ channelName: channelName });
    const comments = channel?.currentStream?.comments;
    comments?.sort((commentA, commentB) => (commentA.streamDuration >= commentB.streamDuration ? 1 : -1));
    return comments;
}

export async function finishStream(userId: string, save: boolean) {
    const channel = await channelRepo.getChannel({ userId: userId });

    if (channel == null) {
        throw new NotFoundError('Channel not found');
    }

    channel.pending = false;
    channel.isOnline = false;

    await channelRepo.updateChannel(channel);

    if (save) {
        await saveStream(channel);
    } else {
        await deleteStream(channel);
    }

    channel.currentStream = null;
    await channelRepo.updateChannel(channel);
}

export async function getSavedStreams() {
    const streams = await streamRepo.getStreams();

    return streams;
}

async function saveStream(channel: Channel) {
    const result = await axios.post<StreamServiceResponce>(
        STREM_SERVER_URL,
        {},
        {
            params: {
                channel: channel.channelName,
                streamId: channel.currentStream?.id,
            },
        }
    );

    if (result.data.status && channel.currentStream) {
        const stream = await streamRepo.createStream({ ...channel.currentStream.toObject() });
    }

    return result.data;
}

async function deleteStream(channel: Channel) {
    let result: AxiosResponse<StreamServiceResponce>;
    try {
        result = await axios.delete<StreamServiceResponce>(STREM_SERVER_URL, {
            params: {
                channel: channel.channelName,
                streamId: channel.currentStream?.id,
            },
        });
    } catch (err) {
        console.log(err);
    }

    return result!.data;
}
