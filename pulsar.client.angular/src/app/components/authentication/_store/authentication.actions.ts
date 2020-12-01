import { createAction, props } from '@ngrx/store';

import { AuthResult } from '../../../models/auth-result.model';
import { Channel, User } from '../../../models';
import { ValidationError } from '../../../models/errors/validation-error.model';

//#region Auth Action

export const storeUser = createAction(
    '[Auth] Store User Data',
    props<{ user: User }>()
);

export const clearAuthStore = createAction('[Auth] Clear Auth Sotre');

//#endregion

//#region Channel Auth Actions

export const storeUserChannel = createAction(
    '[User Auth] Load user channel',
    props<{ channel: Channel }>()
);

export const setIsOffline = createAction('[User Auth] Set Channel is offline');
//#endregion
