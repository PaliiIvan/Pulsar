import { Document, Types } from "mongoose";

export interface Stream {
    id?: any;
    title: string;
    locationPath?: string;
    startDate?: Date;
    comments?: [{
        userId: string,
        userName: string,
        comment: string,
        streamDuration: number,
        dateTime: Date
    }]
}
