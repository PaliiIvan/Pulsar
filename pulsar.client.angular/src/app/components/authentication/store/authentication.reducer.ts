import { createReducer, on, Action } from '@ngrx/store';

import { User } from '../../../models/user.model';
import * as fromaAuthActions from './authentication.actions';


export interface AuthenticationState {
    user: User;
    tokenIsValid: boolean;
}

const initialState: AuthenticationState = {
    user: null,
    tokenIsValid: false
};


const authenticationReducer = createReducer<AuthenticationState>(
    initialState,
    on(fromaAuthActions.userAuthenticationSuccess, (state, user) => ({
        user: {...state.user, email: user.email, id: user.id, login: user.login, token: user.token},
        tokenIsValid: true
    })),
    on(fromaAuthActions.checkTokenValidity, (state) => ({...state, user: {...state.user}})),
    on(fromaAuthActions.regenerateToken, (state) => ({...state})),
    on(fromaAuthActions.setTokentExparationTimer, (state) => ({...state})),
    on(fromaAuthActions.userLogOut, (state) => ({ ...state, tokenIsValid: false, user: null})),
    on(fromaAuthActions.setTokenValidationResult, (state, action) => ({...state, tokenIsValid: action.isTokenValid}))
);

export function reducer(state: AuthenticationState | undefined, action: Action) {
    return authenticationReducer(state, action);
}
