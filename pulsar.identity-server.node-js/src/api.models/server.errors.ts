
export interface ErrorMetadata {
    metadata: any;
    description: string;
    statusCode: number;
}

export class ServerError extends Error implements ErrorMetadata {
    metadata: any;
    description: "Server Error\n";
    statusCode: 500;

    constructor(message: string, metadata?: any) {
        super(message);
        this.metadata = metadata;
    }
}

export class NotFoundError extends Error implements ErrorMetadata {
    metadata: any;
    description: "Resource not found\n";
    statusCode: 404;

    constructor(message: string, metadata?: any) {
        super(message);
        this.metadata = metadata;
    }
}

export class NotAuthorizeError extends Error implements ErrorMetadata {
    metadata: any;
    description: "Access denied\n";
    statusCode: 401;

    constructor(message: string, metadata?: any) {
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