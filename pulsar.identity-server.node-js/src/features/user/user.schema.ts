import { Schema as _Schema, model, Types, Document } from "mongoose";

import UserAccount from "./user.model";

const Schema = _Schema;

interface UserAccountsSchemaModel extends UserAccount, Document {
   
}

const userAccountSchemaDef = new Schema({
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
        required: true
    },
    IsConfirmed: {
        type: Boolean
    }
}, { timestamps: true });

userAccountSchemaDef.set("toObject", { getters: true });

export const userAccountSchema = model<UserAccountsSchemaModel>("user-accounts", userAccountSchemaDef);

