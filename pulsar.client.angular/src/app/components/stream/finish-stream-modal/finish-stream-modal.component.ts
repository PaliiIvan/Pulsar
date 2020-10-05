import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StreamService } from '../../../services/stream/stream.service';

export interface ModalData {
    close: () => void;
}

@Component({
    selector: 'app-finish-stream-modal',
    templateUrl: './finish-stream-modal.component.html',
    styleUrls: ['./finish-stream-modal.component.scss'],
})
export class FinishStreamModalComponent implements OnInit {
    readonly btnDescriptions = {
        stop_and_save: 'stop_save',
        stop_and_dont_save: 'stop_dont_save',
    };

    selectedItem: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public modalData: ModalData,
        private streamService: StreamService
    ) {}

    ngOnInit(): void {}

    stopStream(save: boolean) {
        this.streamService.finishStream(save).subscribe((result) => {
            console.log(result);
        });
    }
}
