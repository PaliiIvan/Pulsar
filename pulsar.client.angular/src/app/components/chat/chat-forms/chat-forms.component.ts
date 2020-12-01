import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StreamService } from '../../../services/stream/stream.service';
import { Comment } from '../../../models';
import { Store } from '@ngrx/store';
import { AppState } from '../../../global-store/app.reducer';

import * as io from 'socket.io-client';
import { StreamPlayerService } from '../../../services/stream/stream-player.service';

@Component({
    selector: 'app-chat-forms',
    templateUrl: './chat-forms.component.html',
    styleUrls: ['./chat-forms.component.scss'],
})
export class ChatFormsComponent implements OnInit {
    @Input()
    channelName: string;

    @Input()
    ChannelGoOfflineEvent: EventEmitter<boolean>;

    @Input()
    isOnline: boolean;
    socket: SocketIOClient.Socket = io(`localhost:8081`);
    constructor(
        private streamService: StreamService,
        private store: Store<AppState>,
        private streamPlayerService: StreamPlayerService
    ) { }

    chatMessageForm = new FormGroup({
        message: new FormControl(''),
    });

    ngOnInit(): void {
        this.socket.on(this.channelName, (msg) => {
            console.log(msg);
        });

        this.ChannelGoOfflineEvent.subscribe((event) => {
            this.isOnline = event;
            this.chatMessageForm.disable();
        });

        if (!this.isOnline) {
            this.chatMessageForm.controls.message.disable();
        }


    }

    sendComment() {
        this.store
            .select((state) => state.auth.user)
            .subscribe((user) => {
                const comment = this.chatMessageForm.get('message').value;
                const commentObj = new Comment({
                    userId: user.id,
                    userName: user.login,
                    comment,
                    streamDuration: null,
                });

                this.streamService
                    .addComment(this.channelName, commentObj)
                    .subscribe(() => {
                        this.chatMessageForm.reset();
                    });
                this.socket.emit(this.channelName, commentObj);
            });
    }
}
