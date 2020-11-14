import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../global-store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailConfirmation } from '../../../models';

import * as fromAuthActions from '../_store/authentication.actions';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { timeStamp } from 'console';

@Component({
    selector: 'app-email-verification',
    templateUrl: './email-verification.component.html',
    styleUrls: ['./email-verification.component.scss'],
})
export class VerifyEmailMessageComponent implements OnInit {
    @Input() emailData: { userId: string; emailToken: string };

    constructor(private store: Store<AppState>, private router: Router, private authenticationService: AuthenticationService) { }

    ngOnInit(): void {


        this.authenticationService.confirmEmail(this.emailData.userId, this.emailData.emailToken).subscribe(response => {
            if (response.isSuccess) {
                setTimeout(() => {
                    console.log('Close Email window');
                }, 1000);
            } else {
                console.log('An error occured on email confirmation please contact support');
            }
        });
    }


}
