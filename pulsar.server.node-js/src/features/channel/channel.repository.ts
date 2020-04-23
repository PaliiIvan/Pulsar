import { channelSchema } from "./channel.schema";
import { Channel } from "./channel.model";

export async function getChannelById(id: any) {
    return await channelSchema.findById(id);
}

export async function createChannel(userId: any, channelName: string, streamToken: string) {
    const saveResult = await channelSchema.create({ userId, channelName, streamToken });
    return saveResult;
}

export async function getChannelByUserId(userId: any): Promise<Channel> {
    const channel = await channelSchema.findOne({userId: userId});
    return channel?.toObject();
}