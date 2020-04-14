export class User {
    id: string;
    logIn: string;
    email: string;

    constructor( id: string, logIn: string, email: string) {
        this.id = id;
        this.logIn = logIn;
        this.email = email;
    }
}