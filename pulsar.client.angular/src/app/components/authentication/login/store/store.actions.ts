import { createAction, props } from '@ngrx/store';

export const logInSubmit = createAction(
    '[Log In] Submit',
     props<{email: string, password: string}>()
    );
