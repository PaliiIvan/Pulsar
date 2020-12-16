export class SignUpResult {
    message: string;
    id: string;
    login: string;

    constructor(message: string, id: string, login: string) {
        this.message = message;
        this.id = id;
        this.login = login;
    }
}