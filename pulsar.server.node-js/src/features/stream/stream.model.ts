import { Document, Types } from "mongoose";

export interface Stream extends Document {
    id: any;
    title: string;
    locationPath: string;
    comments: {
        data: string,
        videoTime: Date,
        DateTime: Date
    }
}