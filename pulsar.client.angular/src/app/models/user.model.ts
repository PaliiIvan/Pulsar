export class User {
    id: string;
    email: string;
    login: string;
    token: string;

    constructor(id?: string, email?: string, login?: string, token?: string) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.token = token;
    }
}
