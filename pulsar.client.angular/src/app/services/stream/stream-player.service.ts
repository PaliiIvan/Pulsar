import { Injectable } from '@angular/core';
import * as HLS from 'hls.js';

@Injectable({
    providedIn: 'root',
})
export class StreamPlayerService {
    hls = new HLS();
    HlsEvents = HLS.Events;
    videoElement: HTMLMediaElement;
    onVideoElementLoadEvent: () => void;

    init(channelSource: string, videoElement: HTMLMediaElement) {
        this.videoElement = videoElement;
        this.hls.loadSource(channelSource);
        this.hls.attachMedia(this.videoElement);
        if (this.onVideoElementLoadEvent) {
            this.onVideoElementLoadEvent();
        }

    }

    startVideo() {
        this.hls.on(this.HlsEvents.MANIFEST_PARSED, () => { this.videoElement.click(); });
    }

    stopVideo() {
        this.hls.destroy();
        this.videoElement.pause();
        this.videoElement.removeAttribute('src');
        this.videoElement.load();
    }

    onStreamTimeChangeEvent(cb: (eventData: any) => void) {
        this.videoElement.addEventListener('timeupdate', cb);
    }

    getVideoTime() {
        return this.videoElement.currentTime;
    }
}
