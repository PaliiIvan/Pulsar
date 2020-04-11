import { createAction, props } from '@ngrx/store';

import { AuthResult } from '../../../models/server-entities/auth-result.model';
import { User } from '../../../models/user.model';


export const userAuthenticationSuccess = createAction (
    '[User Auth] User authenticated',
    props<{user: User}>()
);

export const userLogOut = createAction(
    '[User Auth] User LogOut'
);

export const setTokentExparationTimer = createAction(
    '[User Auth] Token Exparation timer Started',
    props<{token: string, exparationData: number}>()
);

export const checkTokenValidity = createAction(
    '[User Auth] Check the validity of the token',
    props<{token: string}>()
);

export const regenerateToken = createAction(
    '[User Auth] Regenerate User Token',
    props<{ token: string }>()
);

export const setTokenValidationResult = createAction(
    '[User Auth] Set Token Validation result',
    props<{ isTokenValid: boolean }>()
);

export const reLoginUser = createAction(
    '[User Auth] Get User From store and logIn',
    props<{ user: User, isTokenValid: boolean }>()
);
