import { createReducer, on, Action, State } from '@ngrx/store';

import { EmailConfirmation, Channel, User } from '../../../models';

import * as fromAuthActions from './authentication.actions';
import { ValidationError } from '../../../models/errors/validation-error.model';

export interface AuthenticationState {
    user: User;
    channel: Channel;
}

const initialState: AuthenticationState = {
    user: null,
    channel: null,
};

const authenticationReducer = createReducer<AuthenticationState>(
    initialState,
    on(fromAuthActions.clearAuthStore, (state) => ({ ...initialState })),
    on(fromAuthActions.storeUser, (state, action) => ({ ...state, user: action.user })),

    on(fromAuthActions.storeUserChannel, (state, action) => ({
        ...state,
        channel: action.channel,
    })),
    on(fromAuthActions.setIsOffline, (state) => ({
        ...state,
        channel: { ...state.channel, isOnline: false },
    }))
);

export function reducer(
    state: AuthenticationState | undefined,
    action: Action
) {
    return authenticationReducer(state, action);
}
