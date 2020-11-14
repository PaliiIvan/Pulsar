import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { SignUpResult, AuthResult, User, ErrorResponce, RequestResult } from '../../models';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    User = new BehaviorSubject<User>(null);
    readonly API = environment.identityServerUrl;
    constructor(private http: HttpClient) { }

    signUp(email: string, login: string, password: string, repeatPassword: string) {
        return this.http.post<RequestResult<SignUpResult>>(`${this.API}/signup`, {
            email,
            login,
            password,
            repeatPassword,
        });
    }

    logIn(email: string, password: string) {
        return this.http.post<RequestResult<User>>(`${this.API}/login`, { email, password });
    }

    checkToken(token: string) {
        return this.http.post<RequestResult<boolean>>(`${this.API}/check-token`, { token });
    }

    regenerateToken(token: string) {
        return this.http.post<RequestResult<User>>(`${this.API}/regenerate-token`, {
            token,
        });
    }

    confirmEmail(userId: string, emailToken: string) {
        return this.http.post<RequestResult<boolean>>(`${this.API}/complete-auth`, {
            id: userId,
            token: emailToken,
        });
    }

    logOut() {
        localStorage.clear();
    }
}
