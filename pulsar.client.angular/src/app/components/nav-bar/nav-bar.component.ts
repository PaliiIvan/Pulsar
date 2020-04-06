import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user.model';
import { NavBarState } from './store/nav-bar.reducer';
import { AppState } from '../../store/app.reducer';
import * as NavBarActions from './store/nav-bar.action';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: User;
  isAuth: Observable<NavBarState>;
  isSignIn: boolean;

  constructor(private authService: AuthenticationService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAuth = this.store.select(state => state.navBar);
    this.authService.User.subscribe(user => {
      this.user = user;
      this.closeAuthModal();
    });
  }

  authProcessStarted(isSignIn: boolean) {
    this.store.dispatch(NavBarActions.authProcessStarted());
    this.isSignIn = isSignIn;
  }

  closeAuthModal() {
    this.store.dispatch(NavBarActions.authProcessFinished());
  }
}
