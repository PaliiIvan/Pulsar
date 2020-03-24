export class ErrorResponce {
    message: string;
    metadata: any;
    status: false;

    constructor(message: string, metadata?: any) {
        this.message = message;
        this.metadata = metadata;
    }
}
