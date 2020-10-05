import { StreamSchema } from './stream.schema';
import { Stream } from './stream.model';
import { Channel } from '../channel/channel.model';

export async function getStream(id: string) {
    return await StreamSchema.findById(id);
}

export async function updateStream(stream: Stream) {
    return await StreamSchema.updateOne({ _id: stream.id }, stream);
}

export async function createStream(stream: Stream) {
    return await StreamSchema.create(stream);
}

export async function findOne(query: any) {
    return await StreamSchema.findOne(query);
}

export async function getStreams() {
    const streams = await StreamSchema.find().populate('channel');

    return streams.map((stream) => ({
        id: stream.id,
        title: stream.title,
        locationPath: stream.locationPath,
        comments: stream.comments,
        channel: {
            id: (<Channel>stream.channel).id,
            channelName: (<Channel>stream.channel).channelName,
        },
    }));
}
