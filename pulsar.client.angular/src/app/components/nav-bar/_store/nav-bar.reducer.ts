import { createReducer, on, Action } from '@ngrx/store';

import * as NavBarActions from './nav-bar.action';

export interface NavBarState {
    isAuthProcess: boolean;
    isStreaminitProcess: boolean;
}

export const initialState: NavBarState = {
    isAuthProcess: false,
    isStreaminitProcess: false
};


const navBarReducer = createReducer<NavBarState>(
    initialState,
    on(NavBarActions.authProcessStarted, (state) => ({...state, isAuthProcess: true})),
    on(NavBarActions.authProcessFinished, (state) => ({...state, isAuthProcess: false})),
    on(NavBarActions.streamInitStarted, (state) => ({...state, isStreaminitProcess: true})),
    on(NavBarActions.streamInitFinished, (state) => ({...state, isStreaminitProcess: false}))
);

export function reducer(state: NavBarState | undefined, action: Action) {
    return navBarReducer(state, action);
}

