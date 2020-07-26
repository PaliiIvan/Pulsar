import { channelSchema } from "../features/channel/channel.schema";
import { Comment } from "../api.models/comment";


export async function addCommentToStream(channelName: string, commentData: Comment) {

    const channel = await channelSchema.findOne({ channelName: channelName });

    channel?.currentStream?.comments?.push(commentData);
    channel?.save();

}


export async function getComments(channelName: string) {
    const channel = await channelSchema.findOne({ channelName: channelName });
    const comments = channel?.currentStream?.comments;
    comments?.sort((commentA, commentB) => commentA.streamTime >= commentB.streamTime ? 1 : -1);
    return comments;
}