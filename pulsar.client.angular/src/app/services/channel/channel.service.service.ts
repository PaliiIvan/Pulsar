import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Channel } from '../../models/channel.model';
import { ChannelPreview } from '../../models/api.models/channel-preview';

@Injectable({
    providedIn: 'root',
})
export class ChannelService {
    readonly API = `${environment.apiUrl}/channel`;

    constructor(private http: HttpClient) {}

    createChannel(userId: string, logIn: string) {
        return this.http.post(`${this.API}`, { userId, logIn });
    }

    getChannelByUserId(userId: string) {
        return this.http.get<Channel>(`${this.API}/current`);
    }

    getOnlineChannels() {
        return this.http.get<ChannelPreview[]>(`${this.API}/online-channels`);
    }

    getChannelByNameWithStream(channelName: string) {
        return this.http.get(`${this.API}/channel/${channelName}`);
    }
}
