import {
    Component,
    OnInit,
    HostListener,
    AfterContentInit,
    EventEmitter,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../../services/channel/channel.service.service';
import * as io from 'socket.io-client';
@Component({
    selector: 'app-channel-page',
    templateUrl: './channel-page.component.html',
    styleUrls: ['./channel-page.component.scss'],
})
export class ChannelPageComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private channelService: ChannelService
    ) { }
    isChatRemoved = false;
    channel: any;
    socket: SocketIOClient.Socket = io(`localhost:8081`);
    ChannelGoOfflineEvent = new EventEmitter<boolean>();
    ngOnInit(): void {
        this.onResize();

        this.route.paramMap.subscribe((param) => {
            const channelName = param.get('name');
            const streamId = param.get('streamId');
            this.channelService
                .getChannelByNameWithStream(channelName, streamId)
                .subscribe((channelResponse) => {
                    if (channelResponse.isSuccess) {
                        this.channel = channelResponse.data;
                    }
                });

            this.socket.on(`${channelName}_offline_mode`, (msg) => {
                this.ChannelGoOfflineEvent.emit(true);
                console.log(msg);
            });
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (window.innerWidth < 900) {
            this.isChatRemoved = true;
        } else {
            this.isChatRemoved = false;
        }
    }
}
