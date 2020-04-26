import { createAction, props } from '@ngrx/store';

export const authProcessStarted = createAction(
    '[Nav Bar] Auth Started'
);

export const authProcessFinished = createAction(
    '[Nav Bar] Auth Finished'
);

export const streamInitStarted = createAction(
    '[Nav Bar] Stream Init Started'
);

export const streamInitFinished = createAction(
    '[Nav Bar] Stream Init Finished'
);

