import { Component, OnInit } from '@angular/core';
import { StreamService } from 'src/app/services/stream.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private streamService: StreamService) { }
  value: string;
  ngOnInit() {
  }

  startStream() {
    this.streamService.getData().subscribe(x => {
      this.value = x;
    });
  }
}
