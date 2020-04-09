import { createAction, props } from '@ngrx/store';

import { AuthResult } from '../../../models/server-entities/auth-result.model';
import { User } from '../../../models/user.model';


export const userAuthenticationSuccess = createAction (
    '[User Auth] User authenticated',
    props<User>()
);

export const userLogOut = createAction(
    '[User Auth] User LogOut'
);

export const setTokentExparationTimer = createAction(
    '[User Auth] Token Exparation timer Started',
    props<{tokenExpDate: number}>()
);

export const checkTokenValidity = createAction(
    '[User Auth] Check the validity of the token'
);

export const regenerateToken = createAction(
    '[User Auth] Regenerate User Token'
);


