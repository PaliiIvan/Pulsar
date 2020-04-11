import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { ChannelService } from '../../../../services/channel/channel.service.service';
import { switchMap, map } from 'rxjs/operators';

import * as fromSignInActions from './signin.actions';


@Injectable()
export class SignInEffects {

    constructor(
        private action$: Actions,
        private authService: AuthenticationService,
        private channelService: ChannelService) {}


    signUpSend$ = createEffect(() => this.action$
    .pipe(
        ofType(fromSignInActions.signInSend),
        switchMap(action => this.authService.signUp(action.email, action.logIn, action.password, action.repeatPassword)
            .pipe(
                map(res => fromSignInActions.createChannel({userId: res.userId, login: res.login}))
            ))
    ));

    createChannel$ = createEffect(() => this.action$
        .pipe(
            ofType(fromSignInActions.createChannel),
            switchMap(action => this.channelService.createChannel(action.userId, action.login)
                .pipe(
                    map(res => (fromSignInActions.signInSucces()))
                ))
        ));
}
