import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

@Component({
  selector: 'app-stream-settings',
  templateUrl: './stream-settings.component.html',
  styleUrls: ['./stream-settings.component.scss']
})
export class StreamSettingsComponent implements OnInit {

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

}
