export class RequestResult<T> {
    message: string;
    data: T;
    isSuccess: boolean;

    constructor(message: string, isSuccess: boolean, data?: T) {
        this.message = message;
        this.isSuccess = isSuccess;
        this.data = data;
    }
}
