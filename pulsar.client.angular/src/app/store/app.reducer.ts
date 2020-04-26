import { ActionReducerMap } from '@ngrx/store';

import * as navBar from '../components/nav-bar/_store/nav-bar.reducer';
import * as auth from '../components/authentication/_store/authentication.reducer';

export interface AppState {
    navBar: navBar.NavBarState;
    auth: auth.AuthenticationState;
}

export const appReducer: ActionReducerMap<AppState> = {
    navBar: navBar.reducer,
    auth: auth.reducer
};


