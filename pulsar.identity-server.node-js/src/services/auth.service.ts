import { hash, compareSync } from "bcrypt";
import uuid from "uuid/v1";
import sendGrid from "@sendgrid/mail";
import { readFileSync } from "fs";
import path from "path";

import * as userRepo from "../features/user/user.repository";
import { formatString } from "../extensions/string.extensions";
import { constants, files } from "../configs/global.variables";
import { SEND_GRID, BASE_URL, AUTH_SECRET_KEY } from "../configs/secrets";
import * as jwb from "jsonwebtoken";

sendGrid.setApiKey(SEND_GRID);


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
    

    if(user == null) 
        throw new Error("Email or password is incorect")

    var isPasswordCorect = compareSync(password, user.password);

    if(!isPasswordCorect) 
        throw new Error("Email or password is incorect")

    var jsonWebToken = jwb.sign({
                            email: user.email,
                            login: user.login,
                            userId: user.id
                        }, AUTH_SECRET_KEY, {expiresIn: '2h'});

    return {
        id: user.id,
        email:user.email,
        login: user.login,
        token: jsonWebToken
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

    const rootFolder = path.dirname(require.main.filename);
    const fileLocation = path.join(rootFolder, files.CONFIRMATION_EMAIL_TEMPLATE_FILE);

    let emailTemplate = readFileSync(fileLocation, {encoding: "utf8"});

    const confirmationEmailLink =  formatString(constants.CONFIRMATION_EMAIL_LINK, [BASE_URL,userId, emailToken]);

    emailTemplate = formatString(emailTemplate, [login, confirmationEmailLink]);

    const emailConfig = {
        to: userEmail,
        from: "Pulsar <pulsar-auth@pulsar.com>",
        subject: "Confirmation Email from Pulsar",
        html: emailTemplate
    };
    return emailConfig;
}
