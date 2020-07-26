export class Comment {
    userId: string;
    userName: string;
    comment: string;
    streamTime: Date;
    dateTime: Date;

    constructor(commentData: { userId: string, comment: string, streamTime: Date, userName: string }) {
        this.userId = commentData.userId;
        this.userName = commentData.userName;
        this.comment = commentData.comment;
        this.streamTime = commentData.streamTime;
        this.dateTime = new Date();
    }
}
