import { hash } from "bcrypt";
import uuid from "uuid/v1";
import sendGrid from "@sendgrid/mail";
import { readFileSync } from "fs";

import { SaveUser, RemoveUser, GetUserById, UpdateUser } from "../features/user/user.repository";
import { formatString } from "../extensions/string.extensions";

sendGrid.setApiKey(process.env["SENDGRID_KEY"]);


export async function SignUp(email: string, login: string, password: string) {

    const passwordHash = await hash(password, 10);
    const emailToken = uuid();
    let message;
    
    const createdUser = await SaveUser({ _id: null, email, login, password: passwordHash, emailToken, IsConfirmed: false });

    const mailMessage = generateEmail(createdUser._id, createdUser.email, createdUser.login, createdUser.emailToken);

    const result = await sendGrid.send(mailMessage);
    
    if(result.every(x => x)) {
        message = {
            message: "Email Send Success",
            isSuccess: true
        };
    } else {
        const removeResult = await RemoveUser(createdUser._id);
        message = {
            message: "Email not Send",
            isSuccess: false
        };
    }
        
    return message;

}

/**
 * 
 * @param {String} userId 
 * @param {String} emailToken 
 */
export async function CheckEmail(userId: string, emailToken: string) {
    
    const user = await GetUserById(userId);
    let updateResult;

   if(user.emailToken === emailToken) {
       user.IsConfirmed = true;
       user.emailToken = null;
       await UpdateUser(user);

       return {
        message: "Confirm Email Succes",
        isSuccess: true
    };
   }
   return {
       message: "Confirm Email Failed",
       isSuccess: false
   };
}


export function LogIn(email: string, password: string, repeatPassword: string) {
    console.log();
    
}

export function LogOut(email: string, password: string, repeatPassword: string) {
    console.log();
}


/**
 * @param {String} userId
 * @param {String} userEmail
 * @param {String} login
 * @param {String} emailToken 
 */
export function generateEmail(userId: string, userEmail: string, login: string, emailToken: string) {

    const path = __dirname;
    let emailTemplate = readFileSync("resources/mail/confirmation-email.html", {encoding: "utf8"});

    const confirmationEmailLink =  formatString(process.env["CONFIRMATION_EMAIL_LINK"], [userId, emailToken]);

    emailTemplate = formatString(emailTemplate, [login, confirmationEmailLink]);

    const emailConfig = {
        to: userEmail,
        from: "Pulsar <pulsar-auth@pulsar.com>",
        subject: "Confirmation Email from Pulsar",
        html: emailTemplate
    };
    return emailConfig;
}
