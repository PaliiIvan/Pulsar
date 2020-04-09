import { ActionReducerMap } from '@ngrx/store';

import * as navBar from '../components/nav-bar/store/nav-bar.reducer';
import * as logIn from '../components/authentication/login/store/login.reducer';


export interface AppState {
    navBar: navBar.NavBarState;
    logIn: logIn.LogInState;
}

export const appReducer: ActionReducerMap<AppState> = {
    navBar: navBar.reducer,
    logIn: logIn.reducer
};


