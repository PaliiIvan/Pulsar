export class SignUpResult {
    userId: string;
    login: string;

    constructor(userId: string, login: string) {
        this.login = login;
        this.userId = userId;
    }
}

