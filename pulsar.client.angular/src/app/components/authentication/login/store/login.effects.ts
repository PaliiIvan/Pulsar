import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { EMPTY, of, from } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { ErrorResponce } from '../../../../models/server-entities/error-result.server.model';
import { User } from '../../../../models/user.model';
import { ValidationError } from '../../../../models/errors/validation-error.model';
import { AppState } from '../../../../store/app.reducer';
import { AuthResult } from '../../../../models/server-entities/auth-result.model';

import * as logInActions from '../store/login.actions';
import * as fromAuthActions from '../../store/authentication.actions';

@Injectable()
export class LogInEffects {

    constructor(private actions$: Actions, private authService: AuthenticationService, private store: Store<AppState>) { }

    //#region Effects

    logIn$ = createEffect(() => this.actions$
        .pipe(
            ofType(logInActions.logInSubmit),
            switchMap((action) => this.authService.logIn(action.email, action.password)
            .pipe(
                map(authResult => logInActions.logInSuccess({authRes: authResult.data})),
                catchError((errors: ValidationError[]) => of(logInActions.logInValidationError({errors})))
            ))
        ));

    succesLogIn$ = createEffect(() => this.actions$
        .pipe(
            ofType(logInActions.logInSuccess),
            tap(action => fromAuthActions.setTokentExparationTimer({tokenExpDate: action.authRes.tokenExparation})),
            map(res => this.logInUser(res.authRes)),
        ));

    //#endregion



    //#region  Private Methods

    private logInUser(authResult: AuthResult) {
        console.log('User Saved');
        const user = new User(authResult.id, authResult.email, authResult.login, authResult.token);
        localStorage.setItem('user', JSON.stringify(user));
        return fromAuthActions.userAuthenticationSuccess(user);
    }

    //#endregion
}

