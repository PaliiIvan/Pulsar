import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { User } from '../../../models/user.model';
import { ErrorResponce } from '../../../models/server-entities/error-result.server.model';
import { AppState } from '../../../store/app.reducer';
import { ValidationError } from '../../../models/errors/validation-error.model';

import * as fromAuthActions from '../../authentication/_store/authentication.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication.component.scss']
})
export class LogInComponent implements OnInit {

  logInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  validationErr$: Observable<string>;
  constructor(private authService: AuthenticationService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.validationErr$ = this.store.select(state => state.auth.error);
  }

  logIn() {
    const email = this.logInForm.get('email').value;
    const password = this.logInForm.get('password').value;
    this.store.dispatch(fromAuthActions.sendLogInData({email, password}));
  }

}
