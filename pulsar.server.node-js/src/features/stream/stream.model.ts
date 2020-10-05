import { Document, Types } from 'mongoose';
import { Channel } from '../channel/channel.model';

export interface Stream extends Document {
    id?: any;
    title: string;
    locationPath?: string;
    channel: Types.ObjectId | Channel;
    startDate?: Date;
    comments?: [
        {
            userId: string;
            userName: string;
            comment: string;
            streamDuration: number;
            dateTime: Date;
        }
    ];
}
