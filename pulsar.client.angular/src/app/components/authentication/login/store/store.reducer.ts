import { createReducer, on, Action } from '@ngrx/store';

import * as logInActions from './store.actions';



export interface LogInState {
    email: string;
    password: string;
}

const initialState: LogInState = {
    email: '',
    password: ''
};

const logInReducer = createReducer(
    initialState,
    on(logInActions.logInSubmit, (state, logInData) => ({...logInData}))
);


export function reducer(state: LogInState | undefined, action: Action) {
    return logInReducer(state, action);
}

