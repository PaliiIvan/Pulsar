export class ResponseResult {
    message: string;
    data: any;
    isSuccess: boolean;

    constructor(data: any, message?: string) {
        this.message = message;
        this.isSuccess = true;
        this.data = data;
    }
}