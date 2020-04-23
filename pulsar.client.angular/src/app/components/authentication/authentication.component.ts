import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

import * as fromNavBarActions from '../nav-bar/_store/nav-bar.action';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  @Input() isSignUp: boolean;
  @Output() authenticationOff = new EventEmitter();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    console.log(this.isSignUp, 'is Sign up');
  }

  closeAuthWindow() {
    this.store.dispatch(fromNavBarActions.authProcessFinished());
  }
}
