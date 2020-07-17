import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { ChannelService } from '../../../services/channel/channel.service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-stream-init',
  templateUrl: './stream-init.component.html',
  styleUrls: ['./stream-init.component.scss']
})
export class StreamInitComponent implements OnInit {
  streamForm: FormGroup;
  token: string;
  isCopied = false;
  isStreamCreated = false;
  constructor(
    private store: Store<AppState>,
    private channelService: ChannelService,
    private clipboard: Clipboard
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.auth.channel.streamToken)
      .subscribe(streamToken => {
        this.streamForm = new FormGroup({
          streamName: new FormControl(''),
          streamToken: new FormControl({ value: streamToken, disabled: true })
        });
        this.token = streamToken;
      });
  }


  submit() {
    const streamName = this.streamForm.get('streamName').value;
    this.channelService.initiateStream(streamName).subscribe(x => this.isStreamCreated = true);
  }

  copyToken() {
    this.clipboard.copy(this.token);
  }
}
