import { createAction, props } from '@ngrx/store';

import { ErrorResponce } from '../../../../models/server-entities/error-result.server.model';
import { ValidationError } from '../../../../models/errors/validation-error.model';
import { AuthResult } from '../../../../models/server-entities/auth-result.model';


export const logInSubmit = createAction(
    '[Log In] Submit',
    props<{email: string, password: string}>()
    );

export const logInSuccess = createAction(
    '[Log In] Success',
    props<{authRes: AuthResult}>()
);

export const logInValidationError = createAction(
    '[Log In] Validation Server Error',
    props<{errors: ValidationError[]}>()
    );

