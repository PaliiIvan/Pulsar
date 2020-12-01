import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';

import * as HLS from 'hls.js';
import { ChannelService } from '../../services/channel/channel.service.service';
import { ChannelPreview, SavedStream } from '../../models';
import { StreamService } from '../../services/stream/stream.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    constructor(
        private channelService: ChannelService,
        private streamService: StreamService
    ) { }

    videoElement: HTMLMediaElement;
    isEmailConfirmationMessage = false;
    channels: ChannelPreview[];
    savedStreams: ChannelPreview[];

    ngOnInit() {
        this.channelService
            .getOnlineChannels()
            .subscribe((channelsResponse) => {
                if (channelsResponse.isSuccess) {
                    this.channels = channelsResponse.data;
                }
            });

        this.streamService
            .getSavedStreams()
            .subscribe((savedStreamsResponse) => {
                if (savedStreamsResponse.isSuccess) {
                    this.savedStreams = savedStreamsResponse.data;
                }
            });
    }
}
