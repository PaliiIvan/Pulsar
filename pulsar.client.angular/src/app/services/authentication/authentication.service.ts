import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, of, throwError, ObservableInput } from 'rxjs';
import { User } from '../../models/user.model';
import { catchError, tap, mapTo, map } from 'rxjs/operators';
import { RequestResult } from '../../models/server-entities/request-result.server.model';
import { ErrorResponce } from '../../models/server-entities/error-result.server.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  User = new BehaviorSubject<User>(null);
  readonly api = environment.identityServerUrl;
  constructor(private http: HttpClient) { }

  signUp(email: string, login: string, password: string, repeatPassword: string) {
    return this.http.post(`${this.api}/signup`, {email, login, password, repeatPassword});
  }

  logIn(email: string, password: string) {
    return this.http.post(`${this.api}/login`, { email, password })
      .pipe(
        catchError(err => of(new ErrorResponce(err.error.message, err.error.metadata))),
        map<any | ErrorResponce, User | ErrorResponce>(res => {
          if (res instanceof ErrorResponce) {
            return res;
          }
          const user = new User(res.data.id, res.data.email, res.data.login, res.data.token);
          this.User.next(user);
          localStorage.setItem('user', JSON.stringify(user));

          return user;
        }));
  }

  checkToken(token: string) {
    return this.http.post(`${this.api}/check-token`, { token })
      .pipe(
        catchError(err => {
          const httpError = err as HttpErrorResponse;
          if (httpError.status === 401) {
            return of(err.error);
          }
        }),
        map(res => res.status)
      );
  }

  regenerateToken(token: string) {
    this.http.post(`${this.api}/regenerate-token`, { token }).pipe(
      catchError(err => of(new ErrorResponce(err.error.message, err.error.metadata))))
      .subscribe(res => {
          if (res instanceof ErrorResponce) {
            return res;
          }
          const data = (res as any).data;

          const user = new User(data.id, data.email, data.login, data.token);
          this.User.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        });
  }
}
