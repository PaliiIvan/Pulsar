import { createReducer, on, Action, State } from '@ngrx/store';

import { User } from '../../../models/user.model';
import { Channel } from '../../../models/channel.model';
import { EmailConfirmation } from '../../../models/email-confirmation.model';

import * as fromaAuthActions from './authentication.actions';


export interface AuthenticationState {
    user: User;
    channel: Channel;
    isTokenValid: boolean;
    isAuthProccess: boolean;
    isSignUp: boolean;
    error: string;
    showSignUpResultMessage: boolean;
    emailConfirmationMessage: EmailConfirmation;
}

const initialState: AuthenticationState = {
    user: null,
    channel: null,
    isTokenValid: false,
    isAuthProccess: false,
    isSignUp: true,
    error: '',
    showSignUpResultMessage: false,
    emailConfirmationMessage: null
};


const authenticationReducer = createReducer<AuthenticationState>(
    initialState,

    on(fromaAuthActions.authenticationStarted, (state) => ({ ...state, isAuthProccess: true })),
    on(fromaAuthActions.authenticationCompleted, (state) => ({ ...state, isAuthProccess: false })),
    on(fromaAuthActions.authValidationErrors, (state, action) => ({ ...state, error: action.error })),
    on(fromaAuthActions.logOut, (state) => ({ ...initialState })),

    on(fromaAuthActions.logInStarted, (state) => ({ ...state, isSignUp: false })),
    on(fromaAuthActions.sendLogInData, (state) => ({ ...state })),
    on(fromaAuthActions.logInSucces, (state, action) => ({ ...state, user: action.user, isTokenValid: true })),
    on(fromaAuthActions.setAuthTimer, (state) => ({ ...state })),

    on(fromaAuthActions.signUpStarted, (state) => ({ ...state, isSignUp: true })),
    on(fromaAuthActions.sendSignUpData, (state) => ({ ...state })),
    on(fromaAuthActions.signUpSucces, (state) => ({ ...state })),
    on(fromaAuthActions.createUserChannel, (state) => ({ ...state })),
    on(fromaAuthActions.signUpSucces, (state) => ({ ...state, showSignUpResultMessage: true })),
    on(fromaAuthActions.signUpFinisehd, (state => ({ ...state, showSignUpResultMessage: false }))),

    on(fromaAuthActions.loadUserFromStore, (state, action) => ({ ...state})),
    on(fromaAuthActions.checkUserToken, (state, action) => ({ ...state })),
    on(fromaAuthActions.regenerateUserToken, (state, action) => ({ ...state })),
    on(fromaAuthActions.updateUserLocalToken, (state, action) => ({ ...state, user: { ...state.user, token: action.token } })),

    on(fromaAuthActions.getUserChannal, (state) => ({ ...state })),
    on(fromaAuthActions.storeUserChannal, (state, action) => ({ ...state, channel: action.channel })),

    on(fromaAuthActions.storeUserFromLocalStorage, (state, action) => ({...state, user: action.user})),


    on(fromaAuthActions.emailConfirmationSuccessed, (state) => ({
        ...state,
        emailConfirmationMessage: { isSuccess: true, showMessage: true }
    })),
    on(fromaAuthActions.emailConfirmationFailed, (stete) => ({
        ...stete,
        emailConfirmationMessage: { isSuccess: false, showMessage: true }
    })),
    on(fromaAuthActions.emailConfirmationFinished, (state) => ({...state, emailConfirmationMessage: null}))
);

export function reducer(state: AuthenticationState | undefined, action: Action) {
    return authenticationReducer(state, action);
}
