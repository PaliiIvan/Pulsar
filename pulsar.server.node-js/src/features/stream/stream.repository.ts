import { streamSchema } from "./stream.schema";
import { Stream } from "./stream.model";

export async function getStream(id: string) {
    return await streamSchema.findById(id);
}

export async function updateStream(stream: Stream) {
    return await streamSchema.updateOne({_id: stream.id}, stream);
}

export async function createStream(stream: Stream) {
    return await streamSchema.create(stream);
}



export async function findOne(query: any) {
    return await streamSchema.findOne(query);
}