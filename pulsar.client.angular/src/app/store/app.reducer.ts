import { ActionReducerMap } from '@ngrx/store';

import * as navBar from '../components/nav-bar/_store/nav-bar.reducer';
import * as logIn from '../components/authentication/login/_store/login.reducer';
import * as auth from '../components/authentication/_store/authentication.reducer';
import * as signUp from '../components/authentication/signup/_store/signup.reducer';
import * as emailVerification from '../components/email-verification/_store/email-verification.reducer';

export interface AppState {
    navBar: navBar.NavBarState;
    logIn: logIn.LogInState;
    auth: auth.AuthenticationState;
    signUp: signUp.SignUpState;
    emailVerification: emailVerification.EmailVerificationState;
}

export const appReducer: ActionReducerMap<AppState> = {
    navBar: navBar.reducer,
    logIn: logIn.reducer,
    auth: auth.reducer,
    signUp: signUp.reducer,
    emailVerification: emailVerification.reducer
};


