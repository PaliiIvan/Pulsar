import { Schema, Types, model } from "mongoose";
import { Stream } from "./stream.model";

export const streamSchemaDef = new Schema({
    title: {
        type: String,
        required: true
    },
    locationPath: {
        type: String,
        required: true
    },
    comments: [{
        data: String,
        by: Types.ObjectId,
        videoTime: {
            type: Date,
            require: true
        },
        dateTime: {
            type: Date,
            require: true
        }
    }]
}, {timestamps: true});

streamSchemaDef.set("toObject", {getters: true});

export const streamSchema = model<Stream>("Stream", streamSchemaDef);









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