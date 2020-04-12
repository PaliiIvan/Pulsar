import { createAction, props } from '@ngrx/store';

export const authProcessStarted = createAction(
    '[Nav Bar] Auth Started'
);

export const authProcessFinished = createAction(
    '[Nav Bar] Auth Finished'
);
