import { Document, Types } from 'mongoose';
import { Stream } from '../stream/stream.model';

export interface Channel extends Document {
    id: any;
    userId: any;
    channelName: string;
    description: string;
    savedStreams: string;
    isOnline: boolean;
    pending: boolean;
    streamToken: string;
    currentStream: Stream | null;
}
