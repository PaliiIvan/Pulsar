import { Comment } from './comment';

export class SavedStream {
    id: string;
    title: string;
    locationPath: string;
    comments: Comment[];
    channel: {
        id: string;
        channelName: string;
    };
}
