import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { User } from '../../../models/user.model';
import { ErrorResponce } from '../../../models/server-entities/error-result.server.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {

  logInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  validationErr: ErrorResponce;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logIn() {
    const email = this.logInForm.get('email').value;
    const password = this.logInForm.get('password').value;

    this.authService.logIn(email, password).subscribe(res => {
      if (res instanceof User) {
      }
      if (res instanceof ErrorResponce) {
        this.validationErr = res;
      }

    });
  }

}
