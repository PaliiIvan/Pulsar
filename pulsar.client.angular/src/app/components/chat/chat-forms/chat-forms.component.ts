import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StreamService } from '../../../services/stream/stream.service';
import { Comment } from '../../../models/api.models/comment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';

import * as io from 'socket.io-client';

@Component({
    selector: 'app-chat-forms',
    templateUrl: './chat-forms.component.html',
    styleUrls: ['./chat-forms.component.scss'],
})
export class ChatFormsComponent implements OnInit {
    @Input()
    channelName: string;
    socket: SocketIOClient.Socket = io(`localhost:8081`);
    constructor(
        private streamService: StreamService,
        private store: Store<AppState>
    ) {}

    chatMessageForm = new FormGroup({
        message: new FormControl(''),
    });

    ngOnInit(): void {
        this.socket.on(this.channelName, (msg) => {
            console.log(msg);
        });
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
                    streamTime: new Date(),
                });
                this.socket.emit(this.channelName, commentObj);
                this.streamService
                    .addComment(this.channelName, commentObj)
                    .subscribe(() => {
                        this.chatMessageForm.reset();
                    });
            });
    }
}
