import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../global-store/app.reducer';
import { ChannelService } from '../../../services/channel/channel.service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { StreamService } from '../../../services/stream/stream.service';

@Component({
    selector: 'app-stream-init',
    templateUrl: './stream-init.component.html',
    styleUrls: ['./stream-init.component.scss'],
})
export class StreamInitComponent implements OnInit {
    streamForm: FormGroup;
    token: string;
    isCopied = false;
    isStreamCreated = false;

    streamServer = 'https://localhost:5001/';
    streamFormat = '.m3u8';

    constructor(
        private store: Store<AppState>,
        private streamService: StreamService,
        private clipboard: Clipboard
    ) { }

    ngOnInit(): void {
        this.store
            .select((state) => state.auth.channel.streamToken)
            .subscribe((streamToken) => {
                this.streamForm = new FormGroup({
                    streamName: new FormControl(''),
                    streamToken: new FormControl({
                        value: `${this.streamServer}${streamToken}${this.streamFormat}`,
                        disabled: true,
                    }),
                });
                this.token = `${this.streamServer}${streamToken}${this.streamFormat}`;
            });
    }

    submit() {
        const streamName = this.streamForm.get('streamName').value;
        this.streamService
            .initiateStream(streamName)
            .subscribe((x) => (this.isStreamCreated = true));
    }

    copyToken() {
        this.clipboard.copy(this.token);
    }
}
