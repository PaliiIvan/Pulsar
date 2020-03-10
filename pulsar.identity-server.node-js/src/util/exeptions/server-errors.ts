
export interface IErrorMetadata {
    metadata: any;
    description: string;
    statusCode: number;
}

export class ServerError extends Error implements IErrorMetadata {
    metadata: any;
    description: "Server Error";
    statusCode: 500;

    constructor(message: string, metadata?: any){
        super(message);
        this.metadata = metadata;
    }
}

export class NotFoundError extends Error implements IErrorMetadata {
    metadata: any;
    description: "Resource not found";
    statusCode: 404;

    constructor(message: string, metadata?: any){
        super(message);
        this.metadata = metadata;
    }
}

export class NotAuthorizeError extends Error implements IErrorMetadata {
    metadata: any;
    description: "Access denied";
    statusCode: 401;

    constructor(message: string, metadata?: any){
        super(message);
        this.metadata = metadata;
    }
}

export class ErrorResponce {
    message: string;
    metadata: any;
    status: false;

    constructor(message: string, metadata?: any) {
        this.message = message;
        this.metadata = metadata;
    }
}