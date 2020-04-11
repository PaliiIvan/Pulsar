import { createReducer, on, Action } from '@ngrx/store';

import * as fromSignInAction from './signin.actions';

export interface SignInState {
    showSignInResultMessage: boolean;
}

const initialSate: SignInState = {
   showSignInResultMessage: false
};

const signInReducer = createReducer<SignInState>(
    initialSate,
    on(fromSignInAction.signInSend, (state, action) => ({...state})),
    on(fromSignInAction.signInSucces, (state) => ({...state, showSignInResultMessage: true})),
    on(fromSignInAction.signInFinished, (state) => ({...state, showSignInResultMessage: false})),
    on(fromSignInAction.createChannel, (state) => ({...state, }))
);


export function reducer( state: SignInState | undefined, action: Action) {
    return signInReducer(state, action);
}
