import {
    Component,
    OnInit,
    HostListener,
    Input,
    AfterContentInit,
    Output,
    EventEmitter,
    OnDestroy,
} from '@angular/core';
import { element } from 'protractor';
import * as HLS from 'hls.js';

@Component({
    selector: 'app-stream-player',
    templateUrl: './stream-player.component.html',
    styleUrls: ['./stream-player.component.scss'],
})
export class StreamPlayerComponent
    implements OnInit, AfterContentInit, OnDestroy {
    constructor() {}
    isVideoHeightStatic = false;
    changedWidth = 0;
    @Input() channelSource: string;

    videoElement: HTMLMediaElement;
    isEmailConfirmationMessage = false;
    hls: HLS;
    HlsEvents = HLS.Events;
    ngAfterContentInit() {
        this.videoElement = document.getElementById(
            'videoP'
        ) as HTMLMediaElement;
        this.hls = new HLS();
        this.hls.loadSource(this.channelSource);
        this.hls.attachMedia(this.videoElement);

        this.videoElement.addEventListener('timeupdate', (event) =>
            console.log(event)
        );

        this.videoElement.addEventListener('ended', (event) => {
            console.log('--------STOP-------');
        });

        this.hls.on(this.HlsEvents.MANIFEST_PARSED, () =>
            this.videoElement.click()
        );
    }

    ngOnInit(): void {}

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (document.getElementById('videoP').clientHeight >= 548) {
            this.isVideoHeightStatic = true;
        } else {
            this.isVideoHeightStatic = false;
        }
    }

    ngOnDestroy() {
        this.hls.destroy();
    }
}
