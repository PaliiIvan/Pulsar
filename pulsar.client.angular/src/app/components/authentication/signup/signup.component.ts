import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { AppState } from '../../../store/app.reducer';
import { ChannelService } from '../../../services/channel/channel.service.service';

import * as fromSignUpActions from './_store/signup.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../authentication.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    login: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl('')
  });

  showsignUpResultMessage: Observable<boolean>;

  constructor(private authService: AuthenticationService, private channelService: ChannelService, private store: Store<AppState>) { }


  ngOnInit(): void {
    this.showsignUpResultMessage = this.store.select(store => store.signUp.showsignUpResultMessage);
  }

  signUp(): void {
    const email = this.signUpForm.get('email').value;
    const logIn = this.signUpForm.get('login').value;
    const password = this.signUpForm.get('password').value;
    const repeatPassword = this.signUpForm.get('repeatPassword').value;

    this.store.dispatch(fromSignUpActions.sendSignUpData({email, logIn, password, repeatPassword}));

    // this.authService.signUp(email, login, password, repeatPassword)
    // .subscribe(signUpResult => {
    //   console.log(signUpResult);
    //   this.channelService.createChannel('5e568ce5209ef680a419e815', 'BloodShok').subscribe(x => console.log(x));
    // });
  }
}
