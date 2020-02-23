import { Types, Document } from "mongoose";

interface UserAccount {
    _id: any;
    email: string;
    login: string;
    password: string;
    emailToken: string;
    IsConfirmed: boolean;
   
}

export default UserAccount;