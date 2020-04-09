import { createReducer, on } from '@ngrx/store';

import { User } from '../../../models/user.model';
import * as fromaAuthActions from './authentication.actions';

export interface AuthenticationState {
    user: User;
}

const initialState: AuthenticationState = {
    user: null
};


const authenticationReducer = createReducer(
    initialState,
    on(fromaAuthActions.userAuthenticationSuccess, (state, user) => ({
        user: {...state.user, email: user.email, id: user.id, login: user.login, token: user.token}
    })),
    on(fromaAuthActions.checkTokenValidity, (state) => ({user: {...state.user}})),
    on(fromaAuthActions.regenerateToken, (state) => ({...state})),
    on(fromaAuthActions.setTokentExparationTimer, (state) => ({...state})),
    on(fromaAuthActions.userLogOut, (state) => ({...state, user: null}))
);
