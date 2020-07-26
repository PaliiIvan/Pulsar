import { Component, OnInit, Input } from '@angular/core';
import { StreamService } from '../../services/stream/stream.service';
import { Comment } from '../../models/api.models/comment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() channelName: string;
  comments: Comment[];

  constructor(private streamService: StreamService) { }

  ngOnInit(): void {
    this.streamService.getComments(this.channelName).subscribe(comments => this.comments = comments);
  }

}
