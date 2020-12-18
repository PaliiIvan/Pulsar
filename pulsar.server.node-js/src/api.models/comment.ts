export class Comment {
    userId: string;
    userName: string;
    comment: string;
    streamDuration: number;
    dateTime: Date

    constructor(commentData: { userId: string; comment: string; streamDuration: number; userName: string }) {
        this.userId = commentData.userId;
        this.userName = commentData.userName;
        this.comment = commentData.comment;
        this.streamDuration = commentData.streamDuration;
        this.dateTime = new Date();
    }
}