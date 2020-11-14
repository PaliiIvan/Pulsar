import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../global-store/app.reducer';

import { MatDialog } from '@angular/material/dialog';
import { StreamInitComponent } from './stream-init/stream-init.component';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    const streamInitDialog = this.dialog.open(StreamInitComponent);
    streamInitDialog.afterClosed().subscribe(() => console.log('Stream finished'));
  }
}
