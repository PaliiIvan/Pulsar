import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../global-store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailConfirmation } from '../../../models';

import * as fromAuthActions from '../_store/authentication.actions';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { timeStamp } from 'console';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



interface ModalData {
    userId: string;
    emailToken: string;
}

@Component({
    selector: 'app-email-verification',
    templateUrl: './email-verification.component.html',
    styleUrls: ['./email-verification.component.scss'],
})
export class VerifyEmailMessageComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public emailData: ModalData,
        private router: Router,
        private authenticationService: AuthenticationService) { }


    errorMessage: string;
    ngOnInit(): void {

        console.log(this.emailData);

        this.authenticationService.confirmEmail(this.emailData.userId, this.emailData.emailToken)
            .subscribe(response => {
                if (response.isSuccess) {
                    setTimeout(() => {
                        this.router.navigate(['']);
                    }, 1000);
                } else {

                    this.errorMessage = 'An error occurred on email confirmation, please contact support';
                }
            });
    }


}
