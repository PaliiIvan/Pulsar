import { createAction, props } from '@ngrx/store';


export const signInSend = createAction(
    '[Sign In] Send User sign in data',
    props<{email: string, logIn: string, password: string, repeatPassword: string}>()
);

export const createChannel = createAction(
    '[Sign In] Create Channel',
    props<{userId: string, login: string}>()
);

export const signInSucces = createAction(
    '[Sign In] Sign in Succes & Channel created'
);

export const signInFinished = createAction(
    '[Sign In] Sign in finished'
);

