import { createReducer, on, Action } from '@ngrx/store';

import * as fromEmailVerification from './email-verification.actions';

export interface EmailVerificationState {
    isChecking: boolean;
    isSucces: boolean;
}

const initialState: EmailVerificationState = {
    isChecking: false,
    isSucces: false
};

const verifyEmailReducer = createReducer<EmailVerificationState>(
    initialState,
    on(fromEmailVerification.confirmEmail, (state) => ({...state, isChecking: true})),
    on(fromEmailVerification.emailConfirmationSuccess, (state) => ({...state, isChecking: false, isSucces: true}))
);


export function reducer(state: EmailVerificationState | undefined, action: Action) {
    return verifyEmailReducer(state, action);
}
