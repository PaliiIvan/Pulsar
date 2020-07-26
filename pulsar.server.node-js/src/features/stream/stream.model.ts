import { Document, Types } from "mongoose";

export interface Stream {
    id?: any;
    title: string;
    locationPath?: string;
    comments?: [{
        userId: string,
        userName: string,
        comment: string,
        streamTime: Date,
        dateTime: Date
    }]
}
