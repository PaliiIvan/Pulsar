import { Document, Types } from "mongoose";

export interface Stream {
    id?: any;
    title: string;
    locationPath?: string;
    comments?: {
        data: string,
        videoTime: Date,
        DateTime: Date
    }
}
