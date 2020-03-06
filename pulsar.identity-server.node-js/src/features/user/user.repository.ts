import { Types } from "mongoose";

import { userAccountSchema } from "./user.schema";
import UserAccount from "./user.model";

/**
 * @param {any} id
 * @returns {UserAccaunt} user
 */
export async function getUserById(id: string | Types.ObjectId): Promise<UserAccount> {
    const user = await userAccountSchema.findById(id);
    return user?.toObject();
}

/**
 * @param {UserAccaunt} user
 * @returns {UserAccaunt} createdUser
 */
export async function saveUser(user: UserAccount): Promise<UserAccount> {
    const result = await userAccountSchema.create(user);
    return result?.toObject();
}

/**
 * @param {UserAccaunt} user
 */
export async function updateUser(user: UserAccount): Promise<UserAccount> {
    const updateResult = await userAccountSchema.findByIdAndUpdate(user.id, user);
    return updateResult?.toObject();
}

/**
 * @param {String} id User Id
 */
export async function removeUser(id?: string) {
    const removeResult = await userAccountSchema.remove(id);
    return removeResult?.ok;
}

/**
 * 
 * @param {any} query Query for seartching
 */
export async function findOne(query: any): Promise<UserAccount> {
    const user = await userAccountSchema.findOne(query);
    return user?.toObject();
}


