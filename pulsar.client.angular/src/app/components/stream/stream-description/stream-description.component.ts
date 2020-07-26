import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stream-description',
  templateUrl: './stream-description.component.html',
  styleUrls: ['./stream-description.component.scss']
})
export class StreamDescriptionComponent implements OnInit {

  @Input() channelName: string;
  @Input() stream: any;

  constructor() { }

  ngOnInit(): void {
  }

}
