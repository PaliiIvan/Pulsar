import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChannelPreview, SavedStream, Comment } from '../../models';

@Injectable({
    providedIn: 'root',
})
export class StreamService {
    private readonly API = `${environment.apiUrl}/stream`;
    constructor(private http: HttpClient) { }

    initiateStream(title: string) {
        return this.http.post(`${this.API}/initiate-stream`, { title });
    }

    addComment(channelName: string, comment: Comment) {
        return this.http.post(`${this.API}/comment`, { channelName, comment });
    }

    getComments(channelName: string) {
        return this.http.get<Comment[]>(`${this.API}/comment/${channelName}`);
    }

    finishStream(save: boolean) {
        return this.http.post(`${this.API}/finish-stream`, { save });
    }

    getSavedStreams() {
        return this.http.get<ChannelPreview[]>(`${this.API}`);
    }
}
