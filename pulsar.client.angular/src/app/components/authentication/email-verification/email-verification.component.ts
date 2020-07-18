import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailConfirmation } from '../../../models/email-confirmation.model';

import * as fromAuthActions from '../_store/authentication.actions';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class VerifyEmailMessageComponent implements OnInit {

  @Input() emailData: { userId: string, emailToken: string };

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(
      fromAuthActions.sendEmailConfirmation({
        userId: this.emailData.userId,
        emailToken: this.emailData.emailToken
      }));
  }

  closeAuthWindow() {
    this.store.dispatch(fromAuthActions.emailConfirmationFinished());
  }

}
