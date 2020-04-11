import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { AppState } from '../../../store/app.reducer';
import { ChannelService } from '../../../services/channel/channel.service.service';

import * as fromSignInActions from './store/signin.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../authentication.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm = new FormGroup({
    email: new FormControl(''),
    login: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl('')
  });
  message = '';
  constructor(private authService: AuthenticationService, private channelService: ChannelService, private store: Store<AppState>) { }


  ngOnInit(): void {
    this.store.select(store => store.signInState.showSignInResultMessage).subscribe(res => {
      if (res) {
        alert('Sign In succes');
      } else {
        alert('closed');
      }
    });
  }

  signIn(): void {
    const email = this.signInForm.get('email').value;
    const logIn = this.signInForm.get('login').value;
    const password = this.signInForm.get('password').value;
    const repeatPassword = this.signInForm.get('repeatPassword').value;

    this.store.dispatch(fromSignInActions.signInSend({email, logIn, password, repeatPassword}));

    // this.authService.signUp(email, login, password, repeatPassword)
    // .subscribe(signInResult => {
    //   console.log(signInResult);
    //   this.channelService.createChannel('5e568ce5209ef680a419e815', 'BloodShok').subscribe(x => console.log(x));
    // });
  }
}
