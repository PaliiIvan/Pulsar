import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { ChannelService } from '../../../../services/channel/channel.service.service';
import { switchMap, map, tap } from 'rxjs/operators';

import * as fromsignUpActions from './signup.actions';


@Injectable()
export class SignUpEffects {

    constructor(
        private action$: Actions,
        private authService: AuthenticationService,
        private channelService: ChannelService) {}


    signUpSend$ = createEffect(() => this.action$
    .pipe(
        ofType(fromsignUpActions.sendSignUpData),
        switchMap(action => this.authService.signUp(action.email, action.logIn, action.password, action.repeatPassword)
            .pipe(
                map(res => fromsignUpActions.createChannel({userId: res.userId, login: res.login}))
            ))
    ));

    createChannel$ = createEffect(() => this.action$
        .pipe(
            ofType(fromsignUpActions.createChannel),
            switchMap(action => this.channelService.createChannel(action.userId, action.login)
                .pipe(
                    map(res => fromsignUpActions.signUpSucces())
                ))
        ));

}
