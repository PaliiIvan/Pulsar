import { Component, OnInit, Input } from '@angular/core';
import { ChannelPreview } from '../../models/api.models/channel-preview';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stream-preview',
    templateUrl: './stream-preview.component.html',
    styleUrls: ['./stream-preview.component.scss'],
})
export class StreamPreviewComponent implements OnInit {
    @Input() chanel: ChannelPreview;
    @Input() isOffline: boolean;

    constructor(private router: Router) {}

    ngOnInit(): void {}

    goToChannel() {
        if (this.isOffline) {
            this.router.navigate([
                '/channel',
                this.chanel.channelName,
                this.chanel.streamId,
            ]);
        } else {
            this.router.navigate(['/channel', this.chanel.channelName]);
        }
    }
}
