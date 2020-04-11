import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';

import { AuthResult } from '../../../models/server-entities/auth-result.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

import * as fromAuthActions from './authentication.actions';
import * as fromligInActions from '../login/store/login.actions';
import * as fromNavBar from '../../nav-bar/store/nav-bar.action';
@Injectable()
export class AuthenticationEffects {

    constructor(private actions$: Actions, private store: Store<AppState>, private authService: AuthenticationService) { }

    //#region Effects

    logInSuccess$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.userAuthenticationSuccess),
            map(res => fromNavBar.authProcessFinished())
        ));


    setTokenExparationTimer$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.setTokentExparationTimer),
            tap(action => this.startTimer(action.token, action.exparationData))
        ), { dispatch: false });

    checkTokenValidity$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.checkTokenValidity),
            switchMap((action) => this.authService.checkToken(action.token)
                .pipe(
                    map(response => fromAuthActions.setTokenValidationResult({isTokenValid: response.data}))
                ))
        ));

    regenerateToken$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.regenerateToken),
            switchMap(action => this.authService.regenerateToken(action.token)
                .pipe(
                    map(result => fromligInActions.logInSuccess({authRes: result.data}))
                ))
        ));

        reLogInUser$ = createEffect(() => this.actions$
            .pipe(
                ofType(fromAuthActions.reLoginUser),
                map(action => fromAuthActions.checkTokenValidity({token: action.user.token})
        )));

    //#endregion





    //#region Private methods

    private startTimer(token: string, timeForExp: number) {
        console.log('Timer Started');
        console.log('Token Regenerate Date', new Date(timeForExp));
        console.log('ms to regenerateToken: ', timeForExp - new Date().getTime());
        const msToRegenerateToken = timeForExp - new Date().getTime();

        setTimeout(() => {
            console.log('Time to regenerate token');
            this.store.dispatch(fromAuthActions.regenerateToken({token}));
        }, msToRegenerateToken);
    }

    //#endregion
}
