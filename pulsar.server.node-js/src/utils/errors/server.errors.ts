
class BaseHttpError extends Error {
    errorMetadata: any;
    
    constructor(message = "Server Error", err?: any) {
        super(message);
        this.errorMetadata = err;
        this.message = message;
    }
}

export class UnAuthorizedError extends BaseHttpError {

    constructor() {
        super("Unauthorized");
    }
}

export class NotFoundError extends BaseHttpError {

}