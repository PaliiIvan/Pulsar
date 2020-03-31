import * as channelRepo from "../features/channel/channel.repository";

export async function createChannel(userId: string, login: string) {
    const streamToken = "Super Stream Token";
    const result = await channelRepo.createChannel(userId,login, streamToken);
    return result;
}