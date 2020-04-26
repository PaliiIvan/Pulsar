import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom, catchError } from 'rxjs/operators';

import { AuthResult } from '../../../models/server-entities/auth-result.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

import * as fromAuthActions from './authentication.actions';
import * as fromNavBar from '../../nav-bar/_store/nav-bar.action';
import { ChannelService } from '../../../services/channel/channel.service.service';
import { User } from '../../../models/user.model';
import { of } from 'rxjs';
@Injectable()
export class AuthenticationEffects {

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private authService: AuthenticationService,
        private channelService: ChannelService
    ) { }

    //#region Effects

    // logInSuccess$ = createEffect(() => this.actions$
    //     .pipe(
    //         ofType(fromAuthActions.userAuthenticationSuccess),
    //         switchMap(action => this.channelService.getChannelByUserId(action.user.id)
    //             .pipe(switchMap(res => [
    //                 fromAuthActions.setUserChannel({ channel: res }),
    //                 fromNavBar.authProcessFinished()
    //             ])))
    //     ));


    // setTokenExparationTimer$ = createEffect(() => this.actions$
    //     .pipe(
    //         ofType(fromAuthActions.setTokentExparationTimer),
    //         tap(action => this.startTimer(action.token, action.exparationData))
    //     ), { dispatch: false });

    // checkTokenValidity$ = createEffect(() => this.actions$
    //     .pipe(
    //         ofType(fromAuthActions.checkTokenValidity),
    //         switchMap((action) => this.authService.checkToken(action.token)
    //             .pipe(
    //                 map(response => fromAuthActions.setTokenValidationResult({ isTokenValid: response }))
    //             ))
    //     ));

    // regenerateToken$ = createEffect(() => this.actions$
    //     .pipe(
    //         ofType(fromAuthActions.regenerateToken),
    //         switchMap(action => this.authService.regenerateToken(action.token)
    //             .pipe(
    //                 map(result => fromligInActions.logInSuccess({ authRes: result }))
    //             ))
    //     ));

    // reLogInUser$ = createEffect(() => this.actions$
    //     .pipe(
    //         ofType(fromAuthActions.reLoginUser),
    //         map(action => fromAuthActions.checkTokenValidity({ token: action.user.token })
    //         )));

    // loadCurrentUserChannel$ = createEffect(() => this.actions$
    //     .pipe(
    //         ofType(fromAuthActions.loadUserChannel),
    //         switchMap((action) => this.channelService.getChannelByUserId(action.userId)
    //             .pipe(
    //                 map(res =>
    //                     fromAuthActions.setUserChannel({ channel: res }),
    //                 )))
    //     ));

    //#endregion





    //#region Private methods

    // private startTimer(token: string, timeForExp: number) {
    //     const msToRegenerateToken = timeForExp - new Date().getTime();
    //     setTimeout(() => {
    //         console.log('Time to regenerate token');
    //         this.store.dispatch(fromAuthActions.setTokenValidationResult({ isTokenValid: false }));
    //     }, msToRegenerateToken);
    // }

    //#endregion

        //#region LogIn Effects

        sendLogInData$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.sendLogInData),
            switchMap((action) => this.authService.logIn(action.email, action.password)
            .pipe(
                map(userData => fromAuthActions.logInSucces({user: userData})),
                catchError((error: string) => of(fromAuthActions.authValidationErrors({error}))
            ))
        )));

        storeUserLocal$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.logInSucces),
            withLatestFrom(this.store.select(state => state.auth.user)),
            map(([action, userState]) => this.logInUser(userState))
        ));

        setUserTimer$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.setAuthTimer),
            withLatestFrom(this.store.select(state => state.auth.user)),
            tap(([action, userState]) => this.startTimer(userState.token, userState.tokenExpDate))
        ), {dispatch: false});


        getUserChannel$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.setAuthTimer, fromAuthActions.storeUserFromLocalStorage),
            withLatestFrom(this.store.select(state => state.auth.user)),
            switchMap(([action, user]) => this.channelService.getChannelByUserId(user.id)
                .pipe(
                    map(channel => fromAuthActions.storeUserChannal({channel}))
                ))
        ));

        authCompleted$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.storeUserChannal),
            map(action => fromAuthActions.authenticationCompleted())
        ));


        //#endregion

        //#region SignUp Effets

        sendSignUpData$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.sendSignUpData),
            switchMap(action => this.authService.signUp(action.email, action.logIn, action.password, action.repeatPassword)
            .pipe(
                map(res => fromAuthActions.createUserChannel({userId: res.userId, login: res.login})),
                catchError(err => of(fromAuthActions.authValidationErrors({error: err})))
            ))
        ));

        signUpSucces$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.createUserChannel),
            map(action => fromAuthActions.signUpSucces)
        ));

        //#endregion

        //#region Email Confirmation Effecs

        emailConfirmationStarted$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.sendEmailConfirmation),
            switchMap(action => this.authService.confirmEmail(action.userId, action.emailToken)
                .pipe(
                    map(res => fromAuthActions.emailConfirmationSuccessed()),
                    catchError(err => of(fromAuthActions.emailConfirmationFailed()))
                ))
        ));

        //#endregion Email Confirmation Effecs

        //#region ReLogIn User

        loadUserFromLocalStore = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.loadUserFromStore),
            tap(action => this.getUserFromLocalStore())
        ), {dispatch: false});

        checkUserToken = createEffect(() => this.actions$
        .pipe(
            ofType(fromAuthActions.checkUserToken),
            switchMap(action => this.authService.checkToken(action.token)
                .pipe(
                    map(result => this.completeRelogInProccess(result))
                ))
        ));

        //#endregion ReLohIn User

        private logInUser(user: User) {
            console.log('User Saved');
            localStorage.setItem('user', JSON.stringify(user));
            return fromAuthActions.setAuthTimer();
        }

        private getUserFromLocalStore() {
            const user: User = JSON.parse(localStorage.getItem('user'));

            if (user != null) {
                fromAuthActions.checkUserToken({token: user.token});
            }
        }

        private completeRelogInProccess(validationRes: boolean) {
            if (validationRes) {
                const user: User = JSON.parse(localStorage.getItem('user'));
                return fromAuthActions.storeUserFromLocalStorage({user});
            } else {
                return fromAuthActions.logOut();
            }
        }

        private startTimer(token: string, timeForExp: number) {
            const msToRegenerateToken = timeForExp - new Date().getTime();
            setTimeout(() => {
                console.log('Time to regenerate token');
                this.store.dispatch(fromAuthActions.regenerateUserToken({token}));
            }, msToRegenerateToken);
        }
}
