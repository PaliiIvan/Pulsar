export class User {
    id: string;
    login: string;
    email: string;
    token: string;
    tokenExpDate: number;

    constructor(id: string, login: string, email: string, token: string, tokenExparation: number) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.token = token;
        this.tokenExpDate = tokenExparation;
    }
}