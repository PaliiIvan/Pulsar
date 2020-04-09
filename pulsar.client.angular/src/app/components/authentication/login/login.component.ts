import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { User } from '../../../models/user.model';
import { ErrorResponce } from '../../../models/server-entities/error-result.server.model';
import { AppState } from '../../../store/app.reducer';
import { ValidationError } from '../../../models/errors/validation-error.model';

import * as loginActions from './store/login.actions';

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

  validationErr: ValidationError[];
  constructor(private authService: AuthenticationService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(store => store.logIn) .subscribe(x => {
      this.validationErr = x.error;
    });
  }

  logIn() {
    const email = this.logInForm.get('email').value;
    const password = this.logInForm.get('password').value;
    this.store.dispatch(loginActions.logInSubmit({email, password}));
  }

}
