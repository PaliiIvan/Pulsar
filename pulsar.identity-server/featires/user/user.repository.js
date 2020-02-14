const User = require('./user.model');
const UserSchema = require('./user.schema');


/**
 * @param {any} id
 * @returns {User} user
 */
exports.GetUserById = async function(id)  {
    const user = await UserSchema.findById(id); 
    return user.toObject();
}

/**
 * @param {User} user
 */
exports.SaveUser = async function(user) {
    await UserSchema.create(user);
}

