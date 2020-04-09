export class RequestResult<T> {
    message: string;
    data: T;
    status: boolean;

    constructor(message: string, data?: T, status = true) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
