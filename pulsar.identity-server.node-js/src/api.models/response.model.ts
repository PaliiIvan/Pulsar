export class ResponseResult {
    message: string;
    data: any;
    isSuccess: boolean;

    constructor(data: any, isSuccess: boolean = true, message?: string) {
        this.message = message;
        this.isSuccess = isSuccess;
        this.data = data;
    }
}