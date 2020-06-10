import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

import * as fromAuthActions from '../authentication/_store/authentication.actions';
import * as fromNavBarActions from '../nav-bar/_store/nav-bar.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  isSignUp$: Observable<boolean>;

  @Output() authenticationOff = new EventEmitter();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isSignUp$ = this.store.select(state => state.auth.isSignUp);
  }

  closeAuthWindow() {
    this.store.dispatch(fromNavBarActions.authProcessFinished());
  }
}
