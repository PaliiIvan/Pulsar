import { createReducer, on, Action } from '@ngrx/store';

import * as NavBarActions from './nav-bar.action';

export interface NavBarState {
    isAuthProcess: boolean;
}

export const initialState: NavBarState = {
    isAuthProcess: false
};


const navBarReducer = createReducer(
    initialState,
    on(NavBarActions.authProcessStarted, state => ({isAuthProcess: true})),
    on(NavBarActions.authProcessFinished, state => ({isAuthProcess: false}))
);

export function reducer(state: NavBarState | undefined, action: Action) {
    return navBarReducer(state, action);
}

