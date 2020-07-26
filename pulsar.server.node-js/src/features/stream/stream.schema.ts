import { Schema, Types, model, Document } from "mongoose";
import { Stream } from "./stream.model";


interface StreamSchemaModel extends Stream, Document { }

export const streamSchemaDef = new Schema({
    title: {
        type: String,
        required: true
    },
    locationPath: {
        type: String
    },
    startDate: {
        type: Date
    },
    comments: [{
        comment: String,
        userId: Types.ObjectId,
        userName: String,

        streamDuration: {
            type: Number,
            require: true
        },
        dateTime: {
            type: Date,
            require: true
        }
    }]
}, { timestamps: true });

streamSchemaDef.set("toObject", { getters: true });

export const streamSchema = model<StreamSchemaModel>("stream", streamSchemaDef);









// [{
//     data: String,
//     videoTime: {
//         type: Date,
//         require: true
//     },
//     DateTime: {
//         type: Date,
//         require: true
//     }
// }]