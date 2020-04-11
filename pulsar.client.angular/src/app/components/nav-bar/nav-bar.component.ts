import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user.model';
import { NavBarState } from './store/nav-bar.reducer';
import { AppState } from '../../store/app.reducer';

import * as fromNavBarActions from './store/nav-bar.action';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: Observable<User>;
  isAuth: Observable<boolean>;
  isSignIn: boolean;

  constructor(private authService: AuthenticationService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAuth = this.store.select(state => state.navBar.isAuthProcess);
    this.user = this.store.select(state => state.authState.user);
  }

  authProcessStarted(isSignIn: boolean) {
    this.store.dispatch(fromNavBarActions.authProcessStarted());
    this.isSignIn = isSignIn;
  }

  closeAuthModal() {
    this.store.dispatch(fromNavBarActions.authProcessFinished());
  }
}
