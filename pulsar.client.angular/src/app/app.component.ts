import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthenticationService } from './services/authentication/authentication.service';
import { User } from './models/user.model';
import { AppState } from './store/app.reducer';

import * as fromAuthActions from './components/authentication/_store/authentication.actions';
import * as fromLogIn from './components/authentication/login/_store/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pulsar';

  constructor(private authService: AuthenticationService, private store: Store<AppState>) { }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user != null) {
      this.store.dispatch(fromAuthActions.reLoginUser({ user, isTokenValid: true }));

      this.store.select(state => state.auth.isTokenValid)
      .subscribe(isTokenValid => {
        if (!isTokenValid) {
          this.store.dispatch(fromAuthActions.regenerateToken({ token: user.token }));
        }
      });
    }
  }

}
