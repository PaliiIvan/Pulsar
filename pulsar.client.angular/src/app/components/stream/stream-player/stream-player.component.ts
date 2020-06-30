import { Component, OnInit, HostListener } from '@angular/core';
import { element } from 'protractor';

@Component({
    selector: 'app-stream-player',
    templateUrl: './stream-player.component.html',
    styleUrls: ['./stream-player.component.scss'],
})
export class StreamPlayerComponent implements OnInit {
    constructor() {}
    isVideoHeightStatic = false;
    changedWidth = 0;
    ngOnInit(): void {}

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (document.getElementById('videoP').clientHeight >= 548) {
            this.isVideoHeightStatic = true;
        } else {
            this.isVideoHeightStatic = false;
        }
    }
}
