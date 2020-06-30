import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../../services/channel/channel.service.service';

@Component({
    selector: 'app-channel-page',
    templateUrl: './channel-page.component.html',
    styleUrls: ['./channel-page.component.scss'],
})
export class ChannelPageComponent implements OnInit {
    constructor(private route: ActivatedRoute, private channelService: ChannelService) { }
    isChatReomoved = false;
    channel: any;

    ngOnInit(): void {
        this.onResize();

        this.route.paramMap.subscribe(param => {

            const channelName = param.get('name');
            this.channelService.getChannelByNameWithStream(channelName).subscribe(channel => this.channel = channel);
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (window.innerWidth < 900) {
            this.isChatReomoved = true;
        } else {
            this.isChatReomoved = false;
        }
    }
}
