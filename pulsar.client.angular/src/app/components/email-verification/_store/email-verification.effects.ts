import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '../../../services/authentication/authentication.service';

import * as fromEmailVerification from './email-verification.actions';
import { switchMap, tap, map } from 'rxjs/operators';

@Injectable()
export class EmailVerificationEffects {
    constructor(private actions$: Actions, private authService: AuthenticationService) {}

    confirmEmail$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromEmailVerification.confirmEmail),
            switchMap(action => this.authService.confirmEmail(action.userId, action.emailToken)
                .pipe(
                    map(result => fromEmailVerification.emailConfirmationSuccess())
                ))
        ));

}
