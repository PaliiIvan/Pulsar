import { User } from "./identity-user";

let currentUser: User;

export function setUser(user: User) {
    currentUser = user;
}

export function getUser() {
    return User;
}

export function isAuth() {
    return currentUser == null ? false : true;
}

