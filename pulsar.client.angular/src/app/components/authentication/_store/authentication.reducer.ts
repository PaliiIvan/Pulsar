import { createReducer, on, Action } from '@ngrx/store';

import { User } from '../../../models/user.model';
import { Channel } from '../../../models/channel.model';

import * as fromaAuthActions from './authentication.actions';


export interface AuthenticationState {
    user: User;
    channel: Channel;
    isTokenValid: boolean;
}

const initialState: AuthenticationState = {
    user: null,
    channel: null,
    isTokenValid: false
};


const authenticationReducer = createReducer<AuthenticationState>(
    initialState,
    on(fromaAuthActions.userAuthenticationSuccess, (state, action) => ({
        user: {...state.user, email: action.user.email, id: action.user.id, login: action.user.login, token: action.user.token},
        channel: null,
        isTokenValid: true
    })),
    on(fromaAuthActions.setUserChannel, (state, action) => ({...state, channel: action.channel})),
    on(fromaAuthActions.checkTokenValidity, (state) => ({...state, user: {...state.user}})),
    on(fromaAuthActions.regenerateToken, (state) => ({...state})),
    on(fromaAuthActions.setTokentExparationTimer, (state) => ({...state})),
    on(fromaAuthActions.userLogOut, (state) => ({ ...state, isTokenValid: false, user: null})),
    on(fromaAuthActions.setTokenValidationResult, (state, action) => ({...state, isTokenValid: action.isTokenValid})),
    on(fromaAuthActions.reLoginUser, (state, action) => ({...state, user: action.user, isTokenValid: true}))
);

export function reducer(state: AuthenticationState | undefined, action: Action) {
    return authenticationReducer(state, action);
}
