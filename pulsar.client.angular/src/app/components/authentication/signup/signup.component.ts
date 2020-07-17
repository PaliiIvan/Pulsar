import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { AppState } from '../../../store/app.reducer';
import { ChannelService } from '../../../services/channel/channel.service.service';

import * as fromAuthActions from '../_store/authentication.actions';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss', '../authentication.component.scss'],
})
export class SignupComponent implements OnInit {
    signUpForm = new FormGroup({
        email: new FormControl(''),
        login: new FormControl(''),
        password: new FormControl(''),
        repeatPassword: new FormControl(''),
    });

    logInForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    validationErr$: Observable<string>;
    isSignUp$: Observable<boolean>;
    showsignUpResultMessage: Observable<boolean>;

    constructor(
        private authService: AuthenticationService,
        private channelService: ChannelService,
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this.isSignUp$ = this.store.select((state) => state.auth.isSignUp);
        this.showsignUpResultMessage = this.store.select(
            (store) => store.auth.showSignUpResultMessage
        );
        this.validationErr$ = this.store.select((state) => state.auth.error);
    }

    signUp(): void {
        const email = this.signUpForm.get('email').value;
        const logIn = this.signUpForm.get('login').value;
        const password = this.signUpForm.get('password').value;
        const repeatPassword = this.signUpForm.get('repeatPassword').value;

        this.store.dispatch(
            fromAuthActions.sendSignUpData({
                email,
                logIn,
                password,
                repeatPassword,
            })
        );
    }

    logIn() {
        const email = this.logInForm.get('email').value;
        const password = this.logInForm.get('password').value;
        this.store.dispatch(fromAuthActions.sendLogInData({ email, password }));
    }

    signUpStarted() {
        this.store.dispatch(fromAuthActions.signUpStarted());
    }
    logInStarted() {
        this.store.dispatch(fromAuthActions.logInStarted());
    }
}
