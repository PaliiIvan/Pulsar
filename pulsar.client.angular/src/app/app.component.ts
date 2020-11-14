import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthenticationService } from './services/authentication/authentication.service';

import { AppState } from './global-store/app.reducer';
import { User } from './models';

import * as fromAuthActions from './components/authentication/_store/authentication.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pulsar';
  constructor(private authService: AuthenticationService, private store: Store<AppState>) { }

  ngOnInit(): void {

    const user = this.getUserFromLocalStore();

    if (user !== null) {
      this.store.dispatch(fromAuthActions.storeUser({ user }));
    }

    this.store.select(state => state.auth.user).subscribe(user => {
      if (user !== null) {
        this.startTimer(user.token, user.tokenExpDate);
        this.saveUserToLocalStore(user);
      }
    });
  }


  private getUserFromLocalStore() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  private saveUserToLocalStore(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private startTimer(token: string, timeForExp: number) {
    const msToRegenerateToken = timeForExp - new Date().getTime();
    console.log('Timer started, sec:', msToRegenerateToken);
    setTimeout(() => {
      console.log('Time to regenerate token');
      this.authService.regenerateToken(token).subscribe(response => {
        if (response.isSuccess) {
          this.store.dispatch(fromAuthActions.storeUser({ user: response.data }));
        }
      });
    }, msToRegenerateToken);
  }
}
