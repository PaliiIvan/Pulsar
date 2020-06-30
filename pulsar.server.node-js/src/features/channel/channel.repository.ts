import { channelSchema } from './channel.schema';

import { Channel } from './channel.model';
import { Stream } from '../stream/stream.model';
import { MongooseFilterQuery } from 'mongoose';

export async function getChannelById(id: any) {
    return await channelSchema.findById(id);
}

export async function createChannel(userId: any, channelName: string, streamToken: string) {
    const saveResult = await channelSchema.create({ userId, channelName, streamToken });
    return saveResult;
}

export async function getChannelByUserId(userId: any): Promise<Channel> {
    const channel = await channelSchema.findOne({ userId: userId });
    return channel?.toObject();
}

export async function updateChannel(channel: Channel) {
    return await channelSchema.updateOne({ _id: channel.id }, channel);
}

export async function getChannels(conditions: MongooseFilterQuery<Pick<Channel, '_id' | 'userId' | 'channelName' | 'description' | 'savedStreams' | 'isOnline' | 'sreamToken' | 'currentStream'>>) {
    return await channelSchema.find(conditions);
}

export async function getChannel(query: any) {
    return await channelSchema.findOne(query);
}