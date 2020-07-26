import { Component, OnInit, HostListener, Input, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { element } from 'protractor';
import * as HLS from 'hls.js';

@Component({
    selector: 'app-stream-player',
    templateUrl: './stream-player.component.html',
    styleUrls: ['./stream-player.component.scss'],
})
export class StreamPlayerComponent implements OnInit, AfterContentInit {
    constructor() { }
    isVideoHeightStatic = false;
    changedWidth = 0;
    @Input() channelSource: string;

    videoElement: HTMLMediaElement;
    isEmailConfirmationMessage = false;
    hls: HLS;
    ngAfterContentInit() {
        this.videoElement = document.getElementById(
            'videoP'
        ) as HTMLMediaElement;
        this.hls = new HLS();
        this.hls.loadSource(this.channelSource);
        this.hls.attachMedia(this.videoElement);

        const data = this.hls.levels;
        while (true) {
            console.log(this.hls.levels[this.hls.currentLevel].details.fragments[0].programDateTime);
        }
    }

    ngOnInit(): void { }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (document.getElementById('videoP').clientHeight >= 548) {
            this.isVideoHeightStatic = true;
        } else {
            this.isVideoHeightStatic = false;
        }
    }

    getCurrentVideoTime() {
        const nginx_base_timestamp = Math.floor(Date.now() / 4294967296) * 4294967296;
        const program_data = this.hls.levels[this.hls.currentLevel].details.fragments[0].programDateTime as any;
        const start_time = this.hls.levels[this.hls.currentLevel].details.fragments[0];
        const vide_time = this.hls.levels[this.hls.currentLevel].details;

        // console.log(vide_time + program_data - start_time);
        // console.log(vide_time, 'vide_time');
        // console.log(program_data, 'program_data');
        // console.log(start_time, 'start_time');
        console.log(vide_time, 'vide_time');


    }
}
