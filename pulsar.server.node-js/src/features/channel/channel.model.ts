import { Document } from "mongoose";
import { Stream } from "../stream/stream.model";

export interface Channel extends Document {
    id: any;
    userId: any;
    channelName: string;
    description: string;
    savedStreams: string;
    isOnline: boolean;
    sreamToken: string;
    currentStream: Stream;
}