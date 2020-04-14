import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        this.store.select(state => state.auth.user)
        .pipe(
            take(1),
            exhaustMap(user => {
                if (user == null) {
                    return next.handle(req);
                } else {
                    req.clone({
                        setHeaders: {
                            'Content-Type' : 'application/json; charset=utf-8',
                            Accept         : 'application/json',
                            Authorization  : user.token,
                        }
                    });
                }
            })
        );
        return next.handle(req);
    }

}
