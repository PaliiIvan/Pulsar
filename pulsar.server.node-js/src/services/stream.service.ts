import { channelSchema } from "../features/channel/channel.schema";
import { Comment } from "../api.models/comment";


export async function addCommentToStream(channelName: string, commentData: Comment) {

    const channel = await channelSchema.findOne({ channelName: channelName });
    let streamDuration: number;

    if (!channel?.currentStream?.startDate?.getTime()) {
        throw Error('No stream time');
    }
    streamDuration = Date.now() - channel?.currentStream?.startDate?.getTime();

    commentData.streamDuration = channel?.currentStream?.startDate?.getTime() + streamDuration;
    channel?.currentStream?.comments?.push(commentData);
    channel?.save();

}


export async function getComments(channelName: string) {
    const channel = await channelSchema.findOne({ channelName: channelName });
    const comments = channel?.currentStream?.comments;
    comments?.sort((commentA, commentB) => commentA.streamDuration >= commentB.streamDuration ? 1 : -1);
    return comments;
}