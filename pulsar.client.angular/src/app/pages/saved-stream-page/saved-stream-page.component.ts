import { Component, OnInit, Input, HostListener } from '@angular/core';
import { SavedStream } from '../../models';

@Component({
    selector: 'app-saved-stream-page',
    templateUrl: './saved-stream-page.component.html',
    styleUrls: ['./saved-stream-page.component.scss'],
})
export class SavedStreamPageComponent implements OnInit {
    constructor() { }

    @Input()
    savedStreams: SavedStream;

    isChatReomoved = false;

    ngOnInit(): void { }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (window.innerWidth < 900) {
            this.isChatReomoved = true;
        } else {
            this.isChatReomoved = false;
        }
    }
}
