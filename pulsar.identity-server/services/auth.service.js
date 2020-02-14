const bcrypt = require('bcrypt');
const uuid = require('uuid/v1');

const userRepo = require('../featires/user/user.repository');

exports.CreateAcount = async function (email, password) {

    const passwordHash = await bcrypt.hash(password, 10);
    const emailToken = uuid();

    await userRepo.SaveUser({ email, password, emailToken })
}

exports.SignIn = function (email, password, repeatPassword) {
    
}

exports.SignIn = function (email, password, repeatPassword) {
    
}
