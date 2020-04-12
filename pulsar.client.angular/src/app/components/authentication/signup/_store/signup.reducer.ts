import { createReducer, on, Action } from '@ngrx/store';

import * as fromsignUpAction from './signup.actions';

export interface SignUpState {
    showsignUpResultMessage: boolean;
}

const initialSate: SignUpState = {
   showsignUpResultMessage: false
};

const signUpReducer = createReducer<SignUpState>(
    initialSate,
    on(fromsignUpAction.sendSignUpData, (state, action) => ({...state})),
    on(fromsignUpAction.signUpSucces, (state) => ({...state, showsignUpResultMessage: true})),
    on(fromsignUpAction.createChannel, (state) => ({...state, })),
    on(fromsignUpAction.emailValidationSuccess, (state) => ({...state}))
);


export function reducer( state: SignUpState | undefined, action: Action) {
    return signUpReducer(state, action);
}
