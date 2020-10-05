import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user.model';
import { NavBarState } from './_store/nav-bar.reducer';
import { AppState } from '../../store/app.reducer';

import * as fromNavBarActions from './_store/nav-bar.action';
import * as fromAuthActions from '../authentication/_store/authentication.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailConfirmation } from '../../models/email-confirmation.model';
import { Channel } from '../../models/channel.model';
import { ChannelService } from '../../services/channel/channel.service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VerifyEmailMessageComponent } from '../authentication/email-verification/email-verification.component';
import { StreamService } from '../../services/stream/stream.service';
import { FinishStreamModalComponent } from '../stream/finish-stream-modal/finish-stream-modal.component';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    user$: Observable<User>;
    isAuth$: Observable<boolean>;
    channel: Channel;
    isSignUp: boolean;
    isStreamProcess$: Observable<boolean>;
    isEmailConfirmationProccess$: Observable<EmailConfirmation>;
    emailVerificationDialog: MatDialogRef<any>;
    streamMenuDialog: MatDialogRef<any>;
    constructor(
        private store: Store<AppState>,
        private activateRouter: ActivatedRoute,
        private streamService: StreamService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.store
            .select((state) => state.auth.channel)
            .subscribe((channel) => (this.channel = channel));
        this.isAuth$ = this.store.select((state) => state.navBar.isAuthProcess);
        this.user$ = this.store.select((state) => state.auth.user);
        this.isStreamProcess$ = this.store.select(
            (state) => state.navBar.isStreaminitProcess
        );
        this.isEmailConfirmationProccess$ = this.store.select(
            (state) => state.auth.emailConfirmationMessage
        );

        this.activateRouter.queryParamMap.subscribe((params) => {
            const scope = params.get('scope');
            if (scope === 'confirm-email') {
                console.log(scope);
                const userId = params.get('id');
                const emailToken = params.get('token');
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

    authProcessStarted() {
        this.store.dispatch(fromNavBarActions.authProcessStarted());
    }
    authProcessFinished() {
        this.store.dispatch(fromNavBarActions.authProcessFinished());
    }

    streamInitStarted() {
        this.store.dispatch(fromNavBarActions.streamInitStarted());
    }

    logOut() {
        this.store.dispatch(fromAuthActions.logOut());
    }

    finishStream() {
        // this.streamService.finishStream().subscribe(() => {
        //     this.router.navigate(['/home']);
        // });

        this.streamMenuDialog = this.dialog.open(FinishStreamModalComponent, {
            data: { close: () => this.streamMenuDialog.close() },
        });
    }
}
