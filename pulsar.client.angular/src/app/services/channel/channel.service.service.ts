import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  readonly webApi = environment.apiUrl;

  constructor(private http: HttpClient) { }


  createChannel(userId: string, logIn: string) {
    return this.http.post(`${this.webApi}/create-channel`, {userId, logIn});
  }
}
