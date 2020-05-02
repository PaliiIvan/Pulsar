import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  private readonly API = `${environment.apiUrl}/stream`;
  constructor(private http: HttpClient) { }


  initiateStream(title: string) {
    return this.http.post(`${this.API}/initiate-stream`, {title});
  }
}
