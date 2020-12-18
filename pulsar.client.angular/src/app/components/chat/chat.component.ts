import { Component, OnInit, Input, EventEmitter, AfterContentInit } from '@angular/core';
import { StreamService } from '../../services/stream/stream.service';
import { Comment } from '../../models';
import * as io from 'socket.io-client';
import { StreamPlayerService } from '../../services/stream/stream-player.service';
import { environment } from '../../../environments/environment';
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterContentInit {
    @Input() channelName: string;
    @Input() offlineComments: Comment[];
    @Input() ChannelGoOfflineEvent: EventEmitter<boolean>;
    @Input() isOnline: boolean;

    comments: Comment[] = [];
    socket: SocketIOClient.Socket = io(environment.apiUrl);

    constructor(private streamService: StreamService, private streamPlayerService: StreamPlayerService) { }

    ngAfterContentInit() {
        if (!this.isOnline) {
            this.streamPlayerService.onVideoElementLoadEvent = () => {
                this.streamPlayerService.onStreamTimeChangeEvent(eventData => {
                    this.comments = this.offlineComments.filter(comment => comment.streamDuration < eventData.target.currentTime * 1000);
                });

            };
        }
    }

    ngOnInit(): void {
        if (this.isOnline) {
            this.streamService
                .getComments(this.channelName)
                .subscribe((commentsResponse) => {
                    if (commentsResponse.isSuccess) {
                        this.comments = commentsResponse.data;
                    }
                });


            this.socket.on(this.channelName, (msg: Comment) => {
                if (!this.comments
                    .some(comment =>
                        comment.userId === msg.userId &&
                        comment.dateTime === msg.dateTime &&
                        comment.comment === msg.comment
                    )) {
                    this.comments.push(msg);
                }
            });
        }


    }
}
