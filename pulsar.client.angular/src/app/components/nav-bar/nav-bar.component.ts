import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user.model';
import { NavBarState } from './_store/nav-bar.reducer';
import { AppState } from '../../store/app.reducer';

import * as fromNavBarActions from './_store/nav-bar.action';
import * as fromAuthActions from '../authentication/_store/authentication.actions';
import { ActivatedRoute } from '@angular/router';
import { EmailConfirmation } from '../../models/email-confirmation.model';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user$: Observable<User>;
  isAuth$: Observable<boolean>;
  isSignUp: boolean;
  isStreamProcess$: Observable<boolean>;
  isEmailConfirmationProccess$: Observable<EmailConfirmation>;

  constructor(private store: Store<AppState>, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(state => state.navBar.isAuthProcess);
    this.user$ = this.store.select(state => state.auth.user);
    this.isStreamProcess$ = this.store.select(state => state.navBar.isStreaminitProcess);
    this.isEmailConfirmationProccess$ = this.store.select(state => state.auth.emailConfirmationMessage);

    this.router.queryParamMap.subscribe(params => {
      const scope = params.get('scope');

      if (scope === 'confirm-email' ) {
        const userId = params.get('id');
        const emailToken = params.get('token');
        this.store.dispatch(fromAuthActions.sendEmailConfirmation({ userId, emailToken }));
      }
    });
  }

  authProcessStarted() {
    this.store.dispatch(fromNavBarActions.authProcessStarted());
  }

  streamInitStarted() {
    this.store.dispatch(fromNavBarActions.streamInitStarted());
  }

  logOut() {
    this.store.dispatch(fromAuthActions.logOut());
  }
}
