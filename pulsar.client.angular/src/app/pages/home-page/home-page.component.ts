import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';

import * as HLS from 'hls.js';
import { ChannelService } from '../../services/channel/channel.service.service';
import { ChannelPreview } from '../../models/api.models/channel-preview';
import { StreamService } from '../../services/stream/stream.service';
import { SavedStream } from '../../models/api.models/saved-streams';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
    constructor(
        private channelService: ChannelService,
        private streamService: StreamService
    ) {}

    videoElement: HTMLMediaElement;
    isEmailConfirmationMessage = false;
    hls: HLS;
    channels: ChannelPreview[];
    savedStreams: SavedStream[];

    ngAfterViewInit(): void {
        // this.videoElement = document.getElementById(
        //     'videoP'
        // ) as HTMLMediaElement;
        // this.hls = new HLS();
        // this.hls.loadSource(
        //     'https://localhost:5001/vaniyha96/5ee09985b1dfcd235d6fcf1a/index.m3u8'
        // );
        // this.hls.attachMedia(this.videoElement);
        // this.hls.on(HLS.Events.MANIFEST_PARSED, () => this.videoElement.play());
    }
    ngOnInit() {
        this.channelService
            .getOnlineChannels()
            .subscribe((channels) => (this.channels = channels));

        this.streamService
            .getSavedStreams()
            .subscribe((data) => (this.savedStreams = data));
    }
}
