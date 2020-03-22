import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, of, throwError, ObservableInput } from 'rxjs';
import { User } from '../../models/user.model';
import { catchError, tap, mapTo, map } from 'rxjs/operators';
import { RequestResult } from '../../models/server-entities/request-result.server.model';
import { ErrorResponce } from '../../models/server-entities/error-result.server.model';
import { join } from 'path';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  User = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  logIn(email: string, password: string) {
    return this.http.post(environment.identityserver + '/login', { email, password })
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
}
