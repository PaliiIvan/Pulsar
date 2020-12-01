import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChannelPreview, SavedStream, Comment, RequestResult } from '../../models';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../utils/http.error.handler';

@Injectable({
    providedIn: 'root',
})
export class StreamService {
    private readonly API = `${environment.apiUrl}/stream`;
    constructor(private http: HttpClient) { }

    streamTimeUpdateEvent = new EventEmitter<number>();

    initiateStream(title: string) {
        return this.http.post(`${this.API}/initiate-stream`, { title }).pipe(catchError(handleError));
    }

    addComment(channelName: string, comment: Comment) {
        return this.http.post(`${this.API}/comment`, { channelName, comment }).pipe(catchError(handleError));
    }

    getComments(channelName: string) {
        return this.http.get<RequestResult<Comment[]>>(`${this.API}/comment/${channelName}`).pipe(catchError(handleError));
    }

    finishStream(save: boolean) {
        return this.http.post(`${this.API}/finish-stream`, { save }).pipe(catchError(handleError));
    }

    getSavedStreams() {
        return this.http.get<RequestResult<ChannelPreview[]>>(`${this.API}`).pipe(catchError(handleError));
    }


}
