import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChannelPreview, Channel, RequestResult } from '../../models';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../utils/http.error.handler';

@Injectable({
    providedIn: 'root',
})
export class ChannelService {
    readonly API = `${environment.apiUrl}/channel`;

    constructor(private http: HttpClient) { }

    createChannel(userId: string, logIn: string) {
        return this.http.post(`${this.API}`, { userId, logIn });
    }

    getCurrentChannel() {
        return this.http.get<RequestResult<Channel>>(`${this.API}/current`)
            .pipe(catchError(handleError));
    }

    getOnlineChannels() {
        return this.http.get<RequestResult<ChannelPreview[]>>(`${this.API}/online-channels`)
            .pipe(catchError(handleError));
    }

    getChannelByNameWithStream(channelName: string, streamId: string) {
        streamId = streamId == null ? '' : `/${streamId}`;

        return this.http.get<RequestResult<Channel>>(`${this.API}/channel/${channelName}${streamId}`)
            .pipe(catchError(handleError));
    }
}
