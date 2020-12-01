import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { AppState } from '../../../global-store/app.reducer';
import { ChannelService } from '../../../services/channel/channel.service.service';

import * as fromAuthActions from '../_store/authentication.actions';
import { AuthErrorMessage, Channel, User } from '../../../models';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
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

    isSignup = true;

    signUpResultMessage = new AuthErrorMessage(false, '');

    loginResultMessage = new AuthErrorMessage(false, '');

    constructor(
        private authService: AuthenticationService,
        private channelService: ChannelService,
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {

    }

    signUp(): void {
        const email = this.signUpForm.get('email').value;
        const logIn = this.signUpForm.get('login').value;
        const password = this.signUpForm.get('password').value;
        const repeatPassword = this.signUpForm.get('repeatPassword').value;
        this.authService.signUp(email, logIn, password, repeatPassword).subscribe(response => {
            console.log(response);
            if (response.isSuccess) {
                console.log(response);

                this.signUpResultMessage = {
                    showMessage: true,
                    message: response.data.message
                };
            } else {
                this.signUpResultMessage = {
                    showMessage: true,
                    message: response.data.message
                };
            }
        });
    }

    logIn() {
        const email = this.logInForm.get('email').value;
        const password = this.logInForm.get('password').value;

        this.authService.logIn(email, password).subscribe(response => {
            if (response.isSuccess) {
                this.store.dispatch(fromAuthActions.storeUser({ user: response.data }));
                this.channelService.getCurrentChannel().subscribe(channelResponse => {
                    if (channelResponse.isSuccess) {
                        this.store.dispatch(fromAuthActions.storeUserChannel({ channel: channelResponse.data }));
                    } else {
                        this.loginResultMessage = {
                            showMessage: true,
                            message: response.data.message
                        };
                    }
                });
            } else {
                this.loginResultMessage = {
                    showMessage: true,
                    message: response.data.message
                };
            }

        });
    }

    changeAuthFlow() {
        this.isSignup = !this.isSignup;
    }
}
