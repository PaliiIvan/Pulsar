import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

import * as fromAuthActions from '../authentication/_store/authentication.actions';
import * as fromNavBarActions from '../nav-bar/_store/nav-bar.action';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
    isSignUp$: Observable<boolean>;
    isAuthStarted: Observable<boolean>;
    authDialog: MatDialogRef<any, any>;
    @Output() authenticationOff = new EventEmitter();

    constructor(private store: Store<AppState>, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.authDialog = this.dialog.open(SignupComponent);

        this.authDialog.beforeClosed().subscribe(() => {
            this.store.dispatch(fromNavBarActions.authProcessFinished());
        });

        this.store
            .select((state) => state.auth.user)
            .subscribe((user) => {
                if (user) {
                    this.authDialog.close();
                }
            });
    }

    closeAuthWindow() {
        this.store.dispatch(fromNavBarActions.authProcessFinished());
    }
}
