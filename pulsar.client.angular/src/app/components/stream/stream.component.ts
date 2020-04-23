import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

import * as fromNavBar from '../nav-bar/_store/nav-bar.action';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  streamForm: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(state => state.auth.channel.streamToken)
    .subscribe(streamKey => {
      this.streamForm = new FormGroup({
        streamName: new FormControl(''),
        streamKey: new FormControl(streamKey)
      });
    });
  }

  closeWindow() {
    this.store.dispatch(fromNavBar.streamInitFinished());
  }
}
