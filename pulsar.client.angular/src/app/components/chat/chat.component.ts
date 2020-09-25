import { Component, OnInit, Input } from '@angular/core';
import { StreamService } from '../../services/stream/stream.service';
import { Comment } from '../../models/api.models/comment';
import * as io from 'socket.io-client';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    @Input()
    channelName: string;
    comments: Comment[];
    socket: SocketIOClient.Socket = io(`localhost:8081`);

    constructor(private streamService: StreamService) {}

    ngOnInit(): void {
        this.streamService
            .getComments(this.channelName)
            .subscribe((comments) => (this.comments = comments));
        this.socket.on(this.channelName, (msg) => {
            this.comments.push(msg);
        });
    }
}
