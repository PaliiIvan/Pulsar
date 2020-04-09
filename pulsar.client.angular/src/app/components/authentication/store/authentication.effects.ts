import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';

import * as fromAuthActions from './authentication.actions';
import { AuthResult } from '../../../models/server-entities/auth-result.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Injectable()
export class AuthenticationEffects {

    constructor(private actions$: Actions, private store: Store<AppState>, private authService: AuthenticationService) { }

    //#region Effects

    logInSuccess$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.userAuthenticationSuccess),
            tap(res => console.log('Success', res))
        ), { dispatch: false });


    setTokenExparationTimer$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.setTokentExparationTimer),
            tap(action => this.startTimer(action.tokenExpDate))
        ), { dispatch: false });

    checkTokenValidity$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.checkTokenValidity),
            withLatestFrom(this.store.select(state => state.authState.user.token)),
            switchMap(([action, token]) => this.authService.checkToken(token)
                .pipe(
                    map(result => fromAuthActions.setTokenValidationResult({isTokenValid: result.data}))
                )
        )));

    //#endregion





    //#region Private methods

    private startTimer(timeForExp: number) {
        console.log('Timer Started');
        const msToRegenerateToken = timeForExp - new Date().getTime();

        setTimeout(() => {
            console.log('Time to regenerate token');
            this.store.dispatch(fromAuthActions.regenerateToken());
        }, msToRegenerateToken);
    }

    //#endregion
}
