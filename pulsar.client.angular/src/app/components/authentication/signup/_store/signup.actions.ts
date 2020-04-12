import { createAction, props } from '@ngrx/store';


export const sendSignUpData = createAction(
    '[Sign In] Send signUp data',
    props<{email: string, logIn: string, password: string, repeatPassword: string}>()
);

export const createChannel = createAction(
    '[Sign In] Create Channel',
    props<{userId: string, login: string}>()
);

export const signUpSucces = createAction(
    '[Sign In] Sign in Succes & Channel created'
);

export const emailValidationSuccess = createAction(
    '[Sign In] Email Validation success',
    props<{ userId: string, emailToken: string }>()
);
