import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User, EmailConfirmation, Channel } from '../../models';

import { AppState } from '../../global-store/app.reducer';


import * as fromAuthActions from '../authentication/_store/authentication.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VerifyEmailMessageComponent } from '../authentication/email-verification/email-verification.component';
import { StreamService } from '../../services/stream/stream.service';
import { FinishStreamModalComponent } from '../stream/finish-stream-modal/finish-stream-modal.component';
import { SignupComponent } from '../authentication/signup/signup.component';
import { StreamInitComponent } from '../stream/stream-init/stream-init.component';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    user$: Observable<User>;
    channel: Channel;
    emailVerificationDialog: MatDialogRef<any>;
    streamMenuDialog: MatDialogRef<any>;
    authMenuDialog: MatDialogRef<any>;

    constructor(
        private store: Store<AppState>,
        private activateRouter: ActivatedRoute,
        private streamService: StreamService,
        private dialog: MatDialog,
        private router: Router,
        private authService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.store
            .select((state) => state.auth.channel)
            .subscribe((channel) => (this.channel = channel));
        this.user$ = this.store.select((state) => state.auth.user);

        this.activateRouter.queryParamMap.subscribe((params) => {
            const scope = params.get('scope');
            if (scope === 'confirm-email') {
                const userId = params.get('id');
                const emailToken = params.get('token');
                console.log(userId, emailToken);

                this.emailVerificationDialog = this.dialog.open(
                    VerifyEmailMessageComponent,
                    { data: { userId, emailToken } }
                );
                this.emailVerificationDialog
                    .beforeClosed()
                    .subscribe(() => this.router.navigate(['']));
            }
        });
    }


    logOut() {
        this.store.dispatch(fromAuthActions.clearAuthStore());
        this.authService.logOut();
    }

    finishStream() {

        this.streamMenuDialog = this.dialog.open(FinishStreamModalComponent, {
            data: {
                close: () => {
                    this.streamMenuDialog.close();
                    this.store.dispatch(fromAuthActions.setIsOffline());
                },
            },
        });
    }

    showStreamInitModal() {
        this.streamMenuDialog = this.dialog.open(StreamInitComponent);
    }

    showAuthModal() {
        this.authMenuDialog = this.dialog.open(SignupComponent);

        this.authMenuDialog.beforeClosed().subscribe(() => {
            console.log('Authentication finished');
        });

        this.store
            .select((state) => state.auth.user)
            .subscribe((user) => {
                if (user) {
                    this.authMenuDialog.close();
                }
            });
    }
}
