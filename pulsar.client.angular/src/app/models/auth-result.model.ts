export class AuthResult {
    id: string;
    login: string;
    token: string;
    email: string;
    tokenExparation: number;

    constructor(id: string, login: string, email: string, token: string, tokenExparation: number) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.token = token;
        this.tokenExparation = tokenExparation;
    }
}
