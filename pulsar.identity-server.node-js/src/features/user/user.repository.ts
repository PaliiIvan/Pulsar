import UserAccaunt from "./user.model";
import { userAccountSchema } from "./user.schema";
import UserAccount from "./user.model";
import { Types } from "mongoose";

/**
 * @param {any} id
 * @returns {UserAccaunt} user
 */
export async function GetUserById(id: string | Types.ObjectId) {
    const user = await userAccountSchema.findById(id);
    return user.toObject();
}

/**
 * @param {UserAccaunt} user
 * @returns {UserAccaunt} createdUser
 */
export async function SaveUser(user: UserAccount) {
    const result = await userAccountSchema.create(user);
    return result.toObject();
}

/**
 * @param {UserAccaunt} user
 */
export async function UpdateUser(user: UserAccount) {
    const updateResult = await userAccountSchema.findByIdAndUpdate(user._id, user);
    return updateResult.toObject();
}

/**
 * @param {String} id User Id
 */
export async function RemoveUser(id: string) {
    const removeResult = await userAccountSchema.remove(id);
    return removeResult.ok;
}

/**
 * 
 * @param {any} query Query for seartching
 */
export async function FindOne(query: any) {
    const user = await userAccountSchema.findOne(query);
    return user.toObject();
}


