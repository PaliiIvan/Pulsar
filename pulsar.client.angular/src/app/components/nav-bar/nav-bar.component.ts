import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user.model';
import { NavBarState } from './_store/nav-bar.reducer';
import { AppState } from '../../store/app.reducer';

import * as fromNavBarActions from './_store/nav-bar.action';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: Observable<User>;
  isAuth: Observable<boolean>;
  isSignUp: boolean;

  constructor(private authService: AuthenticationService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAuth = this.store.select(state => state.navBar.isAuthProcess);
    this.user = this.store.select(state => state.auth.user);
  }

  authProcessStarted(isSignUp: boolean) {
    this.store.dispatch(fromNavBarActions.authProcessStarted());
    this.isSignUp = isSignUp;
  }

  closeAuthModal() {
    this.store.dispatch(fromNavBarActions.authProcessFinished());
  }
}
