import { createAction, props } from '@ngrx/store';

import { AuthResult } from '../../../models/api.models/auth-result.model';
import { User } from '../../../models/user.model';
import { Channel } from '../../../models/channel.model';

//#region Authentication Actions
export const authenticationStarted = createAction(
    '[User Auth] Authentication started'
);
export const authenticationCompleted = createAction(
    '[User Auth] Authentication completed'
);

export const authValidationErrors = createAction(
    '[User Auth] Authentication validation error',
    props<{ error: string }>()
);

//#region LogIn Actions

export const logInStarted = createAction('[User Auth] LogIn started');

export const sendLogInData = createAction(
    '[User Auth] Send LogIn Data',
    props<{ email: string; password: string }>()
);

export const logInSucces = createAction(
    '[User Auth] LogIn Succes',
    props<{ user: User }>()
);

export const setAuthTimer = createAction(
    '[User Auth] Start timer for token regeneration'
);

//#endregion

//#region SignUp Actions

export const signUpStarted = createAction('[User Auth] SignUp started');

export const sendSignUpData = createAction(
    '[User Auth] Send SignUp data',
    props<{
        email: string;
        logIn: string;
        password: string;
        repeatPassword: string;
    }>()
);

export const createUserChannel = createAction(
    '[User Auth] Create user channel',
    props<{ userId: string; login: string }>()
);

export const signUpSucces = createAction(
    '[User Auth] User Account & Channel created success'
);

export const signUpFinisehd = createAction('[User Auth] SignUp finished');

//#endregion

//#region Email Confirmation Actions

export const sendEmailConfirmation = createAction(
    '[User Auth] Send email confirmation data',
    props<{ userId: string; emailToken: string }>()
);
export const emailConfirmationSuccessed = createAction(
    '[User Auth] Email confirmed succes'
);
export const emailConfirmationFailed = createAction(
    '[User Auth] Email confirmation Failed'
);
export const emailConfirmationFinished = createAction(
    '[User Auth] Email Confirmation finished'
);
export const storeUserFromLocalStorage = createAction(
    '[User Auth] Get user from local storage and add it to state',
    props<{ user: User }>()
);
export const userInLocalStoreNotFound = createAction(
    '[User Auth] User from local store not found'
);
//#endregion

//#region RelogIn Actions

export const loadUserFromStore = createAction(
    '[User Auth] Load user from local store'
);

export const checkUserToken = createAction(
    '[User Auth] Check user token',
    props<{ token: string }>()
);

export const regenerateUserToken = createAction(
    '[User Auth] Create new User token',
    props<{ token: string }>()
);

export const updateUserLocalToken = createAction(
    '[User Auth] Update current local user token',
    props<{ token: string }>()
);

export const logOut = createAction(
    '[User Auth] Log Out user and remove from loical storage'
);

//#endregion

//#region Channel Auth Actions

export const getUserChannal = createAction(
    '[User Auth] Get current user channel'
);

export const storeUserChannal = createAction(
    '[User Auth] Load user channel',
    props<{ channel: Channel }>()
);

//#endregion

//#endregion
