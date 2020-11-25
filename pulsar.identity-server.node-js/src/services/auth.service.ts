import { hash, compareSync } from "bcrypt";
import { readFileSync } from "fs";

import jwt from "jsonwebtoken";
import uuid from "uuid/v1";
import sendGrid from "@sendgrid/mail";
import path from "path";

import logger from "../util/logger";

import { formatString } from "../extensions/string.extensions";
import { NotFoundError, NotAuthorizeError, ServerError } from "../api.models/server.errors";
import { constants, files } from "../configs/global.variables";
import { User } from "../api.models/user.model";
import { SEND_GRID, BASE_URL, AUTH_SECRET_KEY } from "../configs/secrets";
import { ValidationException } from "../util/exeptions/auth-error.parser";

import * as userRepo from "../features/user/user.repository";
import { SignUpResult } from "../api.models/sign-in.model";

sendGrid.setApiKey(SEND_GRID);

export async function signUp(email: string, login: string, password: string) {

    logger.info("SignUp in process");

    const passwordHash = await hash(password, 10);
    const emailToken = uuid();
    let message: any;

    const createdUser = await userRepo.saveUser({ email, login, password: passwordHash, emailToken, IsConfirmed: false });

    try {
        const mailMessage = _generateEmail(createdUser.id, createdUser.email, createdUser.login, createdUser.emailToken);
        const result = await sendGrid.send(mailMessage);

        if (result[0].statusCode == 202) {
            logger.info("Email sended");
            return new SignUpResult("Account was created and confirmation link was &#10; send to you email. Please confirm you email");
        } else {
            logger.error("Email sending Error",);
            throw new ServerError("Email Sending Error", { email: email });
        }
    } catch (err) {
        const removeResult = await userRepo.removeUser(createdUser.id);
        throw err;
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
    if (user.emailToken == null) {
        return true;
    }

    if (user.emailToken === emailToken) {
        user.IsConfirmed = true;
        user.emailToken = null;
        await userRepo.updateUser(user);
        logger.info("Email checking is finished");
        return true;
    }

    logger.error("Email confirmation is failed", { userId: userId, emailToken: emailToken });
    throw new ServerError("Email confirmation failed");
}


export async function logIn(email: string, password: string) {

    logger.info("LogIn in process");
    const tokenExpirationDateInMs = new Date().getTime() + constants.TOKEN_EXPIRATION * 1000;
    const user = await userRepo.findOne({ email: email, IsConfirmed: true });

    if (user == null)
        throw new ValidationException([{ property: '', message: 'Email or password is incorrect' }]);

    const isPasswordCorrect = compareSync(password, user.password);

    if (!isPasswordCorrect)
        throw new ValidationException([{ property: '', message: 'Email or password is incorrect' }]);

    const jsonWebToken = jwt.sign({
        email: user.email,
        id: user.id
    }, AUTH_SECRET_KEY, { expiresIn: constants.TOKEN_EXPIRATION });

    return new User(user.id, user.login, user.email, jsonWebToken, tokenExpirationDateInMs);
}

export async function checkUserToken(token: string) {

    logger.info("Checking User Token in process");

    try {
        const verifuResult = jwt.verify(token, AUTH_SECRET_KEY);
        const decodedToken = jwt.decode(token);
        const userId = decodedToken["userId"];

        const user = await userRepo.findOne({ _id: userId, IsConfirmed: true });

        logger.info("Checking User Token finished");
        return true;

    } catch (err) {
        logger.info("Token validation filed", { token, err });

        return false;
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
    const tokenExparationDateInMs = new Date().getTime() + constants.TOKEN_EXPIRATION * 1000;
    const user = await userRepo.findOne({ _id: userId, IsConfirmed: true });

    if (user == null)
        throw new NotFoundError("User not found", { userId: userId });

    const jsonWebToken = jwt.sign({
        email: user.email,
        id: user.id,
    }, AUTH_SECRET_KEY, { expiresIn: constants.TOKEN_EXPIRATION });

    logger.info("Regeneration Token finished ");
    return new User(user.id, user.login, user.email, jsonWebToken, tokenExparationDateInMs);

}

export async function authApiRequest(token: string) {
    logger.info("Checking User Api Token in process");
    let userId: string;

    try {
        jwt.verify(token, AUTH_SECRET_KEY);
        const decodedToken = jwt.decode(token);
        userId = decodedToken["id"];

    } catch (err) {
        logger.error("Token validation filed", { token: token });
        throw new Error(err);
    }

    const user = await userRepo.findOne({ _id: userId, IsConfirmed: true });

    if (user == null)
        throw new NotFoundError('User not found', { userId: userId });

    logger.info("Checking User Token finished");

    return user;
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

    const confirmationEmailLink = formatString(constants.CONFIRMATION_EMAIL_LINK, [constants.CLIENT_URL, userId, emailToken]);

    emailTemplate = formatString(emailTemplate, [login, confirmationEmailLink]);

    const emailConfig = {
        to: userEmail,
        from: "Pulsar <pulsar-auth@pulsar.com>",
        subject: "Confirmation Email from Pulsar",
        html: emailTemplate
    };
    return emailConfig;
}
