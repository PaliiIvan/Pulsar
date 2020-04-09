import { createReducer, on, Action } from '@ngrx/store';

import * as logInActions from './login.actions';
import { ErrorResponce } from '../../../../models/server-entities/error-result.server.model';
import { ValidationError } from '../../../../models/errors/validation-error.model';


export interface LogInState {
    email: string;
    password: string;
    error: ValidationError[];
}

const initialState: LogInState = {
    email: '',
    password: '',
    error: null
};

/**
 * state - current state
 * (second param) - data from action
 */
const logInReducer = createReducer(
    initialState,
    on(logInActions.logInSubmit, (state, logInData) => ({ ...state, email: logInData.email, password: logInData.password})),
    on(logInActions.logInSuccess, (state) => ({...state, email: '', password: ''})),
    on(logInActions.logInValidationError, (state, action) => ({...state, error: action.errors}))
);


export function reducer(state: LogInState | undefined, action: Action) {
    return logInReducer(state, action);
}

