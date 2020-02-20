const bcrypt = require('bcrypt');
const uuid = require('uuid/v1');
const mailSender = require('@sendgrid/mail');
const fs = require('fs');

const configKeys = require('../configuration-keys');
const userRepo = require('../features/user/user.repository');
const strExtensions = require('../extensions/string.extensions');

mailSender.setApiKey(configKeys.send_grid);

/**
 * 
 * @param {string} email 
 * @param {string} login 
 * @param {string} password 
 */
async function SignUp(email, login, password) {

    const passwordHash = await bcrypt.hash(password, 10);
    const emailToken = uuid();
    let message;
    
    const createdUser = await userRepo.SaveUser({ email, login, password: passwordHash, emailToken, IsConfirmed:false });

    const mailMessage = generateEmail(createdUser._id, createdUser.email, createdUser.login, createdUser.emailToken);

    const result = await mailSender.send(mailMessage);
    
    if(result.every(x => x.complete)) {
        message = {
            message: 'Email Send Success',
            isSuccess: true
        }
    } else {
        const removeResult = await userRepo.RemoveUser(createdUser._id);
        message = {
            message: 'Email not Send',
            isSuccess: false
        }
    }
        
    return message;

}

/**
 * 
 * @param {String} userId 
 * @param {String} emailToken 
 */
async function CheckEmail(userId, emailToken) {
    
    const user = await userRepo.GetUserById(userId);
    let updateResult;

   if(user.emailToken === emailToken) {
       user.IsConfirmed = true;
       user.emailToken = null;
       await userRepo.UpdateUser(user);

       return {
        message: 'Confirm Email Succes',
        isSuccess: true
    };
   }
   return {
       message: 'Confirm Email Failed',
       isSuccess: false
   }
}


function LogIn(email, password, repeatPassword) {
}

function LogOut(email, password, repeatPassword) {

}


/**
 * @param {String} userId
 * @param {String} userEmail
 * @param {String} login
 * @param {String} emailToken 
 */
function generateEmail(userId, userEmail, login, emailToken) {

    const path = __dirname;
    let emailTemplate = fs.readFileSync('resources/mail/confirmation-email.html', {encoding: 'utf8'});
    
    const confirmationEmailLink =  strExtensions.formatString(configKeys.confirmation_email_link, [userId, emailToken]);

    emailTemplate = strExtensions.formatString(emailTemplate, [login, confirmationEmailLink]);

    const emailConfig = {
        to: userEmail,
        from: 'Pulsar <pulsar-auth@pulsar.com>',
        subject: 'Confirmation Email from Pulsar',
        html: emailTemplate
    }
    return emailConfig;
}

module.exports = {
    CheckEmail: CheckEmail,
    SignUp: SignUp,
    LogIn: LogIn,
    LogOut: LogOut
}