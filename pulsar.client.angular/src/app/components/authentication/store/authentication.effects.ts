import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';

import * as fromAuthActions from './authentication.actions';
import { AuthResult } from '../../../models/server-entities/auth-result.model';

@Injectable()
export class AuthenticationEffects {

    constructor(private actions$: Actions) {}

    logInSuccess$ = createEffect(() => this.actions$
    .pipe(
        ofType(fromAuthActions.userAuthenticationSuccess),
        tap(res => console.log('Success', res))
    ), {dispatch: false});



    private logInSystem(authData: AuthResult) {
    }
}
