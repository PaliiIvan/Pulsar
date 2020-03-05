import { hash, compareSync } from "bcrypt";
import { readFileSync } from "fs";
import * as jwb from "jsonwebtoken";
import uuid from "uuid/v1";
import sendGrid from "@sendgrid/mail";
import path from "path";

import * as userRepo from "../features/user/user.repository";
import { formatString } from "../extensions/string.extensions";
import { constants, files } from "../configs/global.variables";
import { SEND_GRID, BASE_URL, AUTH_SECRET_KEY } from "../configs/secrets";

sendGrid.setApiKey(SEND_GRID);

export async function SignUp(email: string, login: string, password: string) {

    const passwordHash = await hash(password, 10);
    const emailToken = uuid();
    let message: any;

    const createdUser = await userRepo.SaveUser({ email, login, password: passwordHash, emailToken, IsConfirmed: false });

    const mailMessage = _generateEmail(createdUser.id, createdUser.email, createdUser.login, createdUser.emailToken);

    const result = await sendGrid.send(mailMessage);

    if (result[0].statusCode == 202) {
        return {
            message: "Email send Success",
            isSuccess: true
        };
    } else {
        const removeResult = await userRepo.RemoveUser(createdUser.id);
        throw new Error("Email Sending Error");
    }
}

/**
 * 
 * @param {String} userId 
 * @param {String} emailToken 
 */
export async function CheckEmail(userId: string, emailToken: string) {

    const user = await userRepo.GetUserById(userId);

    if (user.emailToken === emailToken) {
        user.IsConfirmed = true;
        user.emailToken = null;
        await userRepo.UpdateUser(user);

        return {
            message: "Confirm Email Succes",
            isSuccess: true
        };
    }
    throw new Error("Confirm Email Failed");
}


export async function LogIn(email: string, password: string) {
    const user = await userRepo.FindOne({ email: email, IsConfirmed: true });
    if (user == null)
        throw new Error("Email or password is incorect")

    var isPasswordCorect = compareSync(password, user.password);

    if (!isPasswordCorect)
        throw new Error("Email or password is incorect")

    var jsonWebToken = jwb.sign({
        email: user.email,
        login: user.login,
        userId: user.id
    }, AUTH_SECRET_KEY, { expiresIn: '1d' });

    return {
        id: user.id,
        email: user.email,
        login: user.login,
        token: jsonWebToken
    }
}

export function CheckUserToken(userId: string, token: string) {

    try {
        const decodedToken = jwb.verify(token, AUTH_SECRET_KEY);
    } catch (err) {
        return {
            message: "Token validation filed",
            isSuccess: false
        }
    }
    return {
        message: "Token validation success",
        isSuccess: true
    }

}

export function InitiateChangePassword(userEmail: string) {
    const user = userRepo.FindOne({email: userEmail});

    if(user == null) {
        throw new Error("Email not found");
    }
    
}



/**
 * @param {String} userId
 * @param {String} userEmail
 * @param {String} login
 * @param {String} emailToken 
 */
function _generateEmail(userId: string, userEmail: string, login: string, emailToken: string) {

    const rootFolder = path.dirname(require.main.filename);
    const fileLocation = path.join(rootFolder, files.CONFIRMATION_EMAIL_TEMPLATE_FILE);

    let emailTemplate = readFileSync(fileLocation, { encoding: "utf8" });

    const confirmationEmailLink = formatString(constants.CONFIRMATION_EMAIL_LINK, [BASE_URL, userId, emailToken]);

    emailTemplate = formatString(emailTemplate, [login, confirmationEmailLink]);

    const emailConfig = {
        to: userEmail,
        from: "Pulsar <pulsar-auth@pulsar.com>",
        subject: "Confirmation Email from Pulsar",
        html: emailTemplate
    };
    return emailConfig;
}
