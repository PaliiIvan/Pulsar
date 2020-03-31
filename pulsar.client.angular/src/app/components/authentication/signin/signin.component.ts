import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ChannelService } from '../../../services/channel/channel.service.service';

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

  constructor(private authService: AuthenticationService, private channelService: ChannelService) { }


  ngOnInit(): void {
  }

  signIn(): void {
    const email = this.signInForm.get('email').value;
    const login = this.signInForm.get('login').value;
    const password = this.signInForm.get('password').value;
    const repeatPassword = this.signInForm.get('repeatPassword').value;

    this.authService.signUp(email, login, password, repeatPassword)
    .subscribe(signInResult => {
      console.log(signInResult);
      this.channelService.createChannel('5e568ce5209ef680a419e815', 'BloodShok').subscribe(x => console.log(x));
    });
  }
}
