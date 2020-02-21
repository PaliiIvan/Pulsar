import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

import UserAccount from "./user.model";

const userAccountSchemaDef = new Schema<UserAccount>({
    email: {
        type: String,
        require: true,
        unique: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    emailToken: {
        type: String,
        required: true,
        unique: true
    },
    IsConfirmed: {
        type: Boolean
    }
});

export const userAccountSchema = model("UserAccounts", userAccountSchemaDef);

