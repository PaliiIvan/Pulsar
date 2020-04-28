import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailConfirmation } from '../../../models/email-confirmation.model';

import * as fromAuthActions from '../_store/authentication.actions';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class VerifyEmailMessageComponent implements OnInit {

  emailConfirmationState: Observable<EmailConfirmation>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.emailConfirmationState = this.store.select(state => state.auth.emailConfirmationMessage);

    this.emailConfirmationState.subscribe(res => {
      if (res) {
        setTimeout(() => {
          console.log('Email finished');
          this.store.dispatch(fromAuthActions.emailConfirmationFinished());
        }, 3000);
      }
    });
  }

  closeAuthWindow() {
    this.store.dispatch(fromAuthActions.emailConfirmationFinished());
  }

}
