export class RequestResult {
    message: string;
    data: any;
    status: boolean;

    constructor(message: string, data?: any, status = true) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
