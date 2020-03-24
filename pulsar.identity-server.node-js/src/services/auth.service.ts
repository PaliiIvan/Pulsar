import { hash, compareSync } from "bcrypt";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import uuid from "uuid/v1";
import sendGrid from "@sendgrid/mail";
import path from "path";

import * as userRepo from "../features/user/user.repository";
import { formatString } from "../extensions/string.extensions";
import { constants, files } from "../configs/global.variables";
import { SEND_GRID, BASE_URL, AUTH_SECRET_KEY } from "../configs/secrets";
import logger from "../util/logger";
import { NotFoundError, NotAuthorizeError, ServerError } from "../util/exeptions/server-errors";

sendGrid.setApiKey(SEND_GRID);

export async function signUp(email: string, login: string, password: string) {

    logger.info("SignUp in process");

    const passwordHash = await hash(password, 10);
    const emailToken = uuid();
    let message: any;

    const createdUser = await userRepo.saveUser({ email, login, password: passwordHash, emailToken, IsConfirmed: false });
    const mailMessage = _generateEmail(createdUser.id, createdUser.email, createdUser.login, createdUser.emailToken);
    const result = await sendGrid.send(mailMessage);

    if (result[0].statusCode == 202) {
        return {
            message: "Email send Success",
            isSuccess: true
        };
    } else {

        logger.error("Email sending Error", { user: createdUser, emailMess: result });

        const removeResult = await userRepo.removeUser(createdUser.id);
        throw new ServerError("Email Sending Error");
    }
}

/**
 * 
 * @param {String} userId 
 * @param {String} emailToken 
 */
export async function checkEmail(userId: string, emailToken: string) {

    logger.info("Email checking in process");

    const user = await userRepo.getUserById(userId);

    if (user == null) {
        logger.error("User not Found", { userId: userId, emailToken: emailToken });
        throw new NotFoundError("User not found");
    }

    if (user.emailToken === emailToken) {
        user.IsConfirmed = true;
        user.emailToken = null;
        await userRepo.updateUser(user);

        return {
            message: "Email confirmation is successful.",
            isSuccess: true
        };
    }

    logger.error("Email confirmation is failed", { userId: userId, emailToken: emailToken });
    throw new ServerError("Email confirmation is failed");
}


export async function logIn(email: string, password: string) {

    logger.info("LogIn in process");

    const user = await userRepo.findOne({ email: email, IsConfirmed: true });

    if (user == null)
        throw new NotFoundError("Email or password is incorect");

    const isPasswordCorect = compareSync(password, user.password);

    if (!isPasswordCorect)
        throw new NotFoundError("Email or password is incorect");

    const jsonWebToken = jwt.sign({
        email: user.email,
        id: user.id
    }, AUTH_SECRET_KEY, { expiresIn: "10s" });

    return {
        id: user.id,
        email: user.email,
        login: user.login,
        token: jsonWebToken
    };
}

export async function checkUserToken(token: string) {

    logger.info("Checking User Token in process");

    try {
        const verifuResult = jwt.verify(token, AUTH_SECRET_KEY);
        const decodedToken = jwt.decode(token);
        const userId = decodedToken["userId"];

        const user = await userRepo.getUserById(userId);
        return { ...user, password: null };

    } catch (err) {
        logger.error("Token validation filed", { token });
        throw new NotAuthorizeError("Token validation filed");
    }
}

export function initiateChangePassword(userEmail: string) {
    const user = userRepo.findOne({ email: userEmail });

    if (user == null) {
        throw new NotFoundError("Email not found");
    }

}

export async function regenerateToken(token: string) {
    logger.info("Regeneration Token in process");

    const decodedToken = jwt.decode(token);
    const userId = decodedToken["id"];

    const user = await userRepo.getUserById(userId);

    if (user == null)
        throw new NotFoundError("User not found", {userId: userId});

    const jsonWebToken = jwt.sign({
        email: user.email,
        id: user.id
    }, AUTH_SECRET_KEY, { expiresIn: "10s" });

    return {
        id: user.id,
        email: user.email,
        login: user.login,
        token: jsonWebToken
    };

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
