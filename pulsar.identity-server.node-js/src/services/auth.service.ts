import { hash } from "bcrypt";
import uuid from "uuid/v1";
import sendGrid from "@sendgrid/mail";
import { readFileSync } from "fs";
import { dirname } from "path";

import * as userRepo from "../features/user/user.repository";
import { formatString } from "../extensions/string.extensions";
import { constants } from "../configs/global.variables";
import { SEND_GRID } from "../util/secrets";


sendGrid.setApiKey(SEND_GRID);
const rootFolder = dirname(require.main.filename);

export async function SignUp(email: string, login: string, password: string) {

    const passwordHash = await hash(password, 10);
    const emailToken = uuid();
    let message;
    
    const createdUser = await userRepo.SaveUser({ email, login, password: passwordHash, emailToken, IsConfirmed: false });

    const mailMessage = generateEmail(createdUser.id, createdUser.email, createdUser.login, createdUser.emailToken);

    const result = await sendGrid.send(mailMessage);
    
    if(result[0].statusCode == 202) {
        message = {
            message: "Email Send Success",
            isSuccess: true
        };
    } else {
        const removeResult = await userRepo.RemoveUser(createdUser.id);
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
    
    const user = await userRepo.GetUserById(userId);

   if(user.emailToken === emailToken) {
       user.IsConfirmed = true;
       user.emailToken = null;
       await userRepo.UpdateUser(user);

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


export async function LogIn(email: string, password: string) {
    const user = await userRepo.FindOne({email: email});
    if(user == null) {
        return {
            message: "This Email does not exist",
            isSuccess: false
        }
    }

    var passwordHash = await hash(password, 10);
    if(passwordHash !== user.password) {
        return {
            message: "Email or password is incorect",
            isSuccess: false
        }
    }


}

export function LogOut(email: string, password: string) {
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
    let emailTemplate = readFileSync(`${rootFolder}/resources/mail/confirmation-email.html`, {encoding: "utf8"});

    const confirmationEmailLink =  formatString(constants.CONFIRMATION_EMAIL_LINK, [userId, emailToken]);

    emailTemplate = formatString(emailTemplate, [login, confirmationEmailLink]);

    const emailConfig = {
        to: userEmail,
        from: "Pulsar <pulsar-auth@pulsar.com>",
        subject: "Confirmation Email from Pulsar",
        html: emailTemplate
    };
    return emailConfig;
}
