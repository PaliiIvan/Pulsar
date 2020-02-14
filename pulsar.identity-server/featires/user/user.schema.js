const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user.model');

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
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
    }
});

module.exports = mongoose.model('Users', userSchema);

