import { createAction, props } from '@ngrx/store';

export const confirmEmail = createAction(
    '[Email Confirmaion] Check email and confirm if it is valid',
    props<{ userId: string, emailToken: string }>()
);

export const emailConfirmationSuccess = createAction(
    '[Email Confirmaion] Email confirmaion success'
);
