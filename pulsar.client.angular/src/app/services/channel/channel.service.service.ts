import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  readonly API = environment.apiUrl;

  constructor(private http: HttpClient) { }


  createChannel(userId: string, logIn: string) {
    return this.http.post(`${this.API}/create-channel`, {userId, logIn});
  }

  getChannel(channelId: string) {
    return this.http.get(`${this.API}/${channelId}`);
  }
}
