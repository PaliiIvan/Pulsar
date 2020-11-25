export class AuthErrorMessage {
    showMessage: boolean;
    message: string;

    constructor(showMessage: boolean, message: string) {
        this.showMessage = showMessage;
        this.message = message;
    }
}
