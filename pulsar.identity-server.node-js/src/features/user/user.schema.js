const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAccount = require('./user.model');

const userAccountSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    emailToken: {
        type: String,
        required: true,
        unique: true
    },
    IsConfirmed: {
        type: Boolean
    }
});

module.exports = mongoose.model('UserAccounts', userAccountSchema);

