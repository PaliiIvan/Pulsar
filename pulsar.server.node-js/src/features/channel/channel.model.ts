import { Document } from "mongoose";

export interface Channel extends Document {
    id: any;
    userId: any;
    channelName: string;
    description: string;
    savedStreams: string;
    isOnline: boolean;
    sreamToken: string;
    currentStream: string;
}