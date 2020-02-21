import { Types } from "mongoose";

class UserAccount {
    _id: Types.ObjectId
    email: string;
    login: string;
    password: string;
    emailToken: string;
    IsConfirmed: boolean

    constructor(email: string, login: string, password: string, emailToken: string) {
        this.email = email;
        this.login = login;
        this.password = password;
        this.emailToken = emailToken;
        this.IsConfirmed = false;
    }
}

export default UserAccount;