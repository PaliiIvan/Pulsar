import { createReducer, on, Action } from '@ngrx/store';

import { User } from '../../../models/user.model';

import * as fromaAuthActions from './authentication.actions';


export interface AuthenticationState {
    user: User;
    isTokenValid: boolean;
}

const initialState: AuthenticationState = {
    user: null,
    isTokenValid: false
};


const authenticationReducer = createReducer<AuthenticationState>(
    initialState,
    on(fromaAuthActions.userAuthenticationSuccess, (state, action) => ({
        user: {...state.user, email: action.user.email, id: action.user.id, login: action.user.login, token: action.user.token},
        isTokenValid: true
    })),
    on(fromaAuthActions.checkTokenValidity, (state) => ({...state, user: {...state.user}})),
    on(fromaAuthActions.regenerateToken, (state) => ({...state})),
    on(fromaAuthActions.setTokentExparationTimer, (state) => ({...state})),
    on(fromaAuthActions.userLogOut, (state) => ({ ...state, tokenIsValid: false, user: null})),
    on(fromaAuthActions.setTokenValidationResult, (state, action) => ({...state, tokenIsValid: action.isTokenValid})),
    on(fromaAuthActions.reLoginUser, (state) => ({...state}))
);

export function reducer(state: AuthenticationState | undefined, action: Action) {
    return authenticationReducer(state, action);
}
