export class User {
    id: string;
    email: string;
    login: string;
    token: string;
    tokenExpDate: number;

    constructor(id?: string, email?: string, login?: string, token?: string, tokenExpDate?: number) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.token = token;
        this.tokenExpDate = tokenExpDate;
    }
}
