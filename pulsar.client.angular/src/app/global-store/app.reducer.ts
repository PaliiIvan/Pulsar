import { ActionReducerMap } from '@ngrx/store';

import * as auth from '../components/authentication/_store/authentication.reducer';

export interface AppState {
    auth: auth.AuthenticationState;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: auth.reducer
};


