import { ActionReducerMap } from '@ngrx/store';

import * as navBar from '../components/nav-bar/store/nav-bar.reducer';
import * as logIn from '../components/authentication/login/store/login.reducer';
import * as auth from '../components/authentication/store/authentication.reducer';
import * as signIn from '../components/authentication/signin/store/signin.reducer';

export interface AppState {
    navBar: navBar.NavBarState;
    logIn: logIn.LogInState;
    authState: auth.AuthenticationState;
    signInState: signIn.SignInState;
}

export const appReducer: ActionReducerMap<AppState> = {
    navBar: navBar.reducer,
    logIn: logIn.reducer,
    authState: auth.reducer,
    signInState: signIn.reducer
};


