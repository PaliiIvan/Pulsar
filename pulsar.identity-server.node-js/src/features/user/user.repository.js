const UserAccaunt = require('./user.model');
const UserSchema = require('./user.schema');


/**
 * @param {any} id
 * @returns {UserAccaunt} user
 */
async function GetUserById(id) {
    const user = await UserSchema.findById(id);
    return user.toObject();
}

/**
 * @param {UserAccaunt} user
 * @returns {UserAccaunt} createdUser
 */
async function SaveUser(user) {
    const result = await UserSchema.create(user);
    return result.toObject();
}

/**
 * @param {UserAccaunt} user
 */
async function UpdateUser(user) {
    const updateResult = await UserSchema.findByIdAndUpdate(user._id, user);
    return updateResult.toObject();
}

/**
 * @param {String} id User Id
 */
async function RemoveUser(id) {
    const removeResult = await UserSchema.remove(id);
    return removeResult.toObject();
}

/**
 * 
 * @param {any} query Query for seartching
 */
async function FindOne(query) {
    const user = await UserSchema.findOne(query);
    return user.toObject();
}

module.exports = {
    FindOne: FindOne,
    RemoveUser: RemoveUser,
    UpdateUser: UpdateUser,
    SaveUser: SaveUser,
    GetUserById: GetUserById
}