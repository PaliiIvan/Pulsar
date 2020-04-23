import { HttpInterceptor, HttpRequest, HttpResponse, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { ValidationError } from '../../models/errors/validation-error.model';
import { HttpServerError } from '../../models/errors/http-server-error.model';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req)
            .pipe(catchError((httpError: HttpErrorResponse) => {
                if (httpError.status === 400) {
                    const validationError = httpError.error.metadata as ValidationError[];
                    console.log('httpError.error', httpError.error);
                    return throwError(validationError);
                } else {
                const httpServerError = httpError.error as HttpServerError;
                return throwError(httpServerError);
                }
            }));
    }
}

