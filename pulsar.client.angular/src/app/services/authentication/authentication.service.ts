import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { RequestResult } from '../../models/server-entities/request-result.server.model';
import { User } from '../../models/user.model';
import { ErrorResponce } from '../../models/server-entities/error-result.server.model';
import { AuthResult } from '../../models/server-entities/auth-result.model';
import { SignUpUser } from '../../models/server-entities/signup-user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  User = new BehaviorSubject<User>(null);
  readonly API = environment.identityServerUrl;
  constructor(private http: HttpClient) { }

  signUp(email: string, login: string, password: string, repeatPassword: string) {
    return this.http.post<SignUpUser>(`${this.API}/signup`, {email, login, password, repeatPassword});
  }

  logIn(email: string, password: string) {

    return this.http.post<User>(`${this.API}/login`, { email, password });
  }

  checkToken(token: string) {
    return this.http.post<boolean>(`${this.API}/check-token`, { token });
  }

  regenerateToken(token: string) {
    return this.http.post<AuthResult>(`${this.API}/regenerate-token`, { token });
  }

  confirmEmail(userId: string, emailToken: string) {
    return this.http.post<boolean>(`${this.API}/complete-auth`, {id: userId, token: emailToken});
  }
}
